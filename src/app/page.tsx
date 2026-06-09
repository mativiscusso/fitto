"use client";

import { useState } from "react";
import { Goal, MealType, Recipe, GOALS, MEAL_TYPES } from "@/types/recipe";

type Screen = "select" | "recipe" | "success";

export default function Home() {
  const [screen, setScreen] = useState<Screen>("select");
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);
  const [selectedMeal, setSelectedMeal] = useState<MealType | null>(null);
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [changingIngredient, setChangingIngredient] = useState<number | null>(null);

  const handleGenerate = async () => {
    if (!selectedGoal || !selectedMeal) return;

    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          goal: selectedGoal,
          mealType: selectedMeal,
        }),
      });
      const data = await res.json();

      if (data.error) {
        setError(data.error);
      } else {
        setRecipe(data.recipe);
        setScreen("recipe");
      }
    } catch (err) {
      setError("Error al generar la receta. Intentá de nuevo.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleShuffle = async () => {
    if (!selectedGoal || !selectedMeal) return;

    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          goal: selectedGoal,
          mealType: selectedMeal,
        }),
      });
      const data = await res.json();

      if (data.error) {
        setError(data.error);
      } else {
        setRecipe(data.recipe);
      }
    } catch (err) {
      setError("Error al generar otra receta.");
    } finally {
      setLoading(false);
    }
  };

  const handleChangeIngredient = async (index: number) => {
    if (!recipe || !selectedGoal || !selectedMeal) return;

    setChangingIngredient(index);
    setError(null);
    try {
      const currentIngredient = recipe.ingredients[index];
      const substitute = currentIngredient.substitutes?.[0];

      if (!substitute) {
        setChangingIngredient(null);
        return;
      }

      const newIngredients = [...recipe.ingredients];
      const remainingSubs = currentIngredient.substitutes?.slice(1) || [];
      newIngredients[index] = {
        ...currentIngredient,
        name: substitute,
        substitutes: remainingSubs,
        icon: currentIngredient.icon,
      };

      setRecipe({ ...recipe, ingredients: newIngredients });
    } catch (err) {
      console.error(err);
    } finally {
      setChangingIngredient(null);
    }
  };

  const handleBack = () => {
    setScreen("select");
    setRecipe(null);
    setError(null);
  };

  const handleNewRecipe = () => {
    setSelectedGoal(null);
    setSelectedMeal(null);
    setRecipe(null);
    setScreen("select");
    setError(null);
  };

  if (screen === "success") {
    return (
      <main className="container">
        <div className="success-message">
          <div className="success-icon">🍽️</div>
          <h2 className="success-title">¡Buena elección!</h2>
          <p className="success-text">
            Tu menú fue guardado. ¡A cocinar se dijo!
          </p>
          <button className="btn-new" onClick={handleNewRecipe}>
            Generar otra receta
          </button>
        </div>
      </main>
    );
  }

  if (screen === "select") {
    return (
      <main className="container">
        <h1 className="logo">Fitto</h1>
        <p className="subtitle">Comé sano según tu objetivo</p>

        <h2 className="section-title">¿Qué querés mejorar?</h2>
        <div className="goal-grid">
          {GOALS.map((goal) => (
            <button
              key={goal.id}
              className={`goal-card ${selectedGoal === goal.id ? "selected" : ""}`}
              onClick={() => setSelectedGoal(goal.id)}
            >
              <div className="goal-icon">{goal.icon}</div>
              <div className="goal-label">{goal.label}</div>
            </button>
          ))}
        </div>

        <h2 className="section-title">¿Para qué comida?</h2>
        <div className="meal-grid">
          {MEAL_TYPES.map((meal) => (
            <button
              key={meal.id}
              className={`meal-card ${selectedMeal === meal.id ? "selected" : ""}`}
              onClick={() => setSelectedMeal(meal.id)}
            >
              <div className="meal-icon">{meal.icon}</div>
              <div className="meal-label">{meal.label}</div>
            </button>
          ))}
        </div>

        {error && <p className="error-message">{error}</p>}

        <button
          className="btn-generate"
          onClick={handleGenerate}
          disabled={!selectedGoal || !selectedMeal || loading}
        >
          {loading ? "Buscando receta..." : "Generar receta"}
        </button>

        {loading && (
          <div className="loading">
            <div className="loading-spinner"></div>
            <p className="loading-text">Preparando tu receta...</p>
          </div>
        )}
      </main>
    );
  }

  if (screen === "recipe" && recipe) {
    const mealInfo = MEAL_TYPES.find((m) => m.id === selectedMeal);

    return (
      <main className="container">
        <div className="recipe-screen">
          <div className="recipe-header">
            <button className="btn-back" onClick={handleBack}>
              ←
            </button>
            <span className="meal-type-badge">
              {mealInfo?.icon} {mealInfo?.label}
            </span>
          </div>

          <div className="recipe-card">
            <div className="recipe-image-placeholder">🍽️</div>
            <div className="recipe-content">
              <h2 className="recipe-name">{recipe.name}</h2>
              {recipe.calories && (
                <p className="recipe-calories">~{recipe.calories} kcal</p>
              )}

              <h3 className="ingredients-title">Ingredientes</h3>
              <div className="ingredients-list">
                {recipe.ingredients.map((ing, index) => (
                  <div
                    key={index}
                    className={`ingredient-chip ${
                      changingIngredient === index ? "changing" : ""
                    }`}
                  >
                    <span className="ingredient-icon">{ing.icon}</span>
                    <span>{ing.name}</span>
                    {ing.substitutes && ing.substitutes.length > 0 && (
                      <button
                        className="btn-change-ingredient"
                        onClick={() => handleChangeIngredient(index)}
                        disabled={changingIngredient !== null}
                      >
                        cambiar
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {recipe.instructions && recipe.instructions.length > 0 && (
                <>
                  <h3 className="ingredients-title">Cómo prepararlo</h3>
                  <ol className="instructions-list">
                    {recipe.instructions.map((step, i) => (
                      <li key={i} className="instruction-step">
                        {step}
                      </li>
                    ))}
                  </ol>
                </>
              )}
            </div>
          </div>

          {error && <p className="error-message">{error}</p>}

          <div className="recipe-actions">
            <button className="btn-shuffle" onClick={handleShuffle} disabled={loading}>
              🔄 Otra
            </button>
            <button className="btn-ok" onClick={() => setScreen("success")}>
              ✓ Me sirve
            </button>
          </div>
        </div>
      </main>
    );
  }

  return null;
}