"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import {
  Goal, MealType, Recipe, Ingredient,
  GOALS, MEAL_TYPES, getFoodImageForMeal,
} from "@/types/recipe";
import { INGREDIENT_CATALOG } from "@/lib/ingredients";

type Screen = "goal" | "meal" | "success";

type IngredientImage = {
  name: string;
  url: string | null;
  loading: boolean;
};

// ── Progress Dots ─────────────────────────────────────────────────────────
function ProgressDots({ step }: { step: number }) {
  return (
    <div className="progress-dots">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className={`progress-dot ${i <= step ? "active" : ""}`} />
      ))}
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────
export default function Home() {
  const [screen, setScreen] = useState<Screen>("goal");
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);
  const [selectedMeal, setSelectedMeal] = useState<MealType | null>(null);
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [foodImage, setFoodImage] = useState<string>("/bowl.jpg");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ingredientImages, setIngredientImages] = useState<IngredientImage[]>([]);
  const historyRef = useRef<string[]>([]);

  // ── Image fetching ──────────────────────────────────────────────────────
  const fetchImages = async (ingredients: Ingredient[]) => {
    const names = ingredients.map((i) => i.name);
    setIngredientImages(names.map((name) => ({ name, url: null, loading: true })));

    try {
      const res = await fetch("/api/ingredients/image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ingredients: names }),
      });
      const data = await res.json();
      if (data.results) {
        setIngredientImages(
          data.results.map((r: { name: string; url: string | null }) => ({
            name: r.name,
            url: r.url,
            loading: false,
          }))
        );
      }
    } catch {
      setIngredientImages(names.map((name) => ({ name, url: null, loading: false })));
    }
  };

  // ── Generate recipe ─────────────────────────────────────────────────────
  const handleGenerate = async () => {
    if (!selectedGoal || !selectedMeal) return;
    setLoading(true);
    setError(null);
    setFoodImage(getFoodImageForMeal(selectedMeal));
    setIngredientImages([]);

    try {
      const res = await fetch("/api/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          goal: selectedGoal,
          mealType: selectedMeal,
          history: historyRef.current,
        }),
      });
      const data = await res.json();
      if (data.error) {
        setError(data.error);
      } else {
        historyRef.current.push(data.templateId || data.recipe.id);
        setRecipe(data.recipe);
        fetchImages(data.recipe.ingredients);
      }
    } catch {
      setError("Error al generar. Intentá de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  // ── Swap single ingredient ──────────────────────────────────────────────
  const handleSwapIngredient = async (index: number) => {
    if (!recipe) return;
    const current = recipe.ingredients[index];
    const currentCatalogItem = INGREDIENT_CATALOG.find(
      (item) => item.nameEs === current.name || item.id === current.id
    );
    if (!currentCatalogItem) return;

    const usedIds = recipe.ingredients.map((i) => i.id).filter(Boolean);
    const alternatives = INGREDIENT_CATALOG.filter(
      (item) =>
        item.category === currentCatalogItem.category &&
        item.id !== currentCatalogItem.id &&
        !usedIds.includes(item.id)
    );
    if (alternatives.length === 0) return;

    const picked = alternatives[Math.floor(Math.random() * alternatives.length)];
    const newIngredient: Ingredient = {
      id: picked.id,
      name: picked.nameEs,
      icon: current.icon,
      category: picked.category,
      substitutes: [],
    };

    const newIngredients = recipe.ingredients.map((ing, i) =>
      i === index ? newIngredient : ing
    );
    setRecipe({ ...recipe, ingredients: newIngredients });

    // Fetch image for new ingredient
    setIngredientImages((prev) =>
      prev.map((img, i) =>
        i === index ? { name: newIngredient.name, url: null, loading: true } : img
      )
    );

    try {
      const res = await fetch("/api/ingredients/image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ingredients: [newIngredient.name] }),
      });
      const data = await res.json();
      if (data.results?.[0]) {
        const result = data.results[0];
        setIngredientImages((prev) =>
          prev.map((img, i) =>
            i === index ? { name: newIngredient.name, url: result.url, loading: false } : img
          )
        );
      }
    } catch {
      setIngredientImages((prev) =>
        prev.map((img, i) =>
          i === index ? { name: newIngredient.name, url: null, loading: false } : img
        )
      );
    }
  };

  const handleRestart = () => {
    setScreen("goal");
    setSelectedGoal(null);
    setSelectedMeal(null);
    setRecipe(null);
    setError(null);
    setIngredientImages([]);
    historyRef.current = [];
  };

  // ── Success Screen ──────────────────────────────────────────────────────
  if (screen === "success") {
    return (
      <div className="screen">
        <div className="success-screen">
          <div className="success-icon">
            <i className="bx bx-check-circle"></i>
          </div>
          <h2 className="success-title">¡Buena elección!</h2>
          <p className="success-text">Guardaste tu comida. ¡A preparar!</p>
          <button className="btn-new" onClick={handleRestart}>
            <i className="bx bx-refresh"></i>
            Nueva receta
          </button>
        </div>
      </div>
    );
  }

  // ── Goal Selection Screen ───────────────────────────────────────────────
  if (screen === "goal") {
    return (
      <div className="screen">
        <div className="screen-header screen-header-center">
          <div className="header-icon">
            <i className="bx bx-heart-circle"></i>
          </div>
          <ProgressDots step={1} />
        </div>

        <h1 className="screen-title">¿Qué objetivo tienes?</h1>
        <p className="screen-subtitle">Selecciona tu objetivo principal</p>

        <div className="goal-list">
          {GOALS.map((goal) => {
            const isSelected = selectedGoal === goal.id;
            return (
              <button
                key={goal.id}
                className={`goal-item ${isSelected ? "selected" : ""}`}
                onClick={() => setSelectedGoal(goal.id)}
              >
                <div className="goal-item-icon">
                  <i className={`${goal.icon}`} style={{ fontSize: "1.3rem" }}></i>
                </div>
                <div className="goal-item-text">
                  <div className="goal-item-label">{goal.label}</div>
                  <div className="goal-item-desc">{goal.description}</div>
                </div>
                <div className="goal-radio">
                  {isSelected && <i className="bx bx-check" style={{ fontSize: "0.8rem" }}></i>}
                </div>
              </button>
            );
          })}
        </div>

        <div className="bottom-bar">
          <button
            className="btn-primary"
            disabled={!selectedGoal}
            onClick={() => setScreen("meal")}
          >
            Continuar
          </button>
        </div>
      </div>
    );
  }

  // ── Meal & Recipe Screen ────────────────────────────────────────────────
  const mealInfo = MEAL_TYPES.find((m) => m.id === selectedMeal);
  const goalInfo = GOALS.find((g) => g.id === selectedGoal);

  return (
    <div className="screen">
      {/* Header */}
      <div className="screen-header">
        <button className="btn-back" onClick={() => { setScreen("goal"); setRecipe(null); setError(null); }}>
          <i className="bx bx-arrow-back"></i>
        </button>
        <ProgressDots step={recipe ? 3 : 2} />
      </div>

      {/* Meal type selector */}
      <p className="meal-section-label">¿Qué comida quieres?</p>
      <div className="meal-tabs-wrap">
        <div className="meal-tabs">
          {MEAL_TYPES.map((meal) => (
            <button
              key={meal.id}
              className={`meal-tab ${selectedMeal === meal.id ? "selected" : ""}`}
              onClick={() => {
                setSelectedMeal(meal.id);
                setRecipe(null);
                setError(null);
                setIngredientImages([]);
              }}
            >
              {meal.label}
            </button>
          ))}
        </div>
      </div>

      {/* Generate button */}
      <button
        className="btn-generate"
        onClick={handleGenerate}
        disabled={!selectedMeal || loading}
      >
        {loading ? (
          <>
            <i className="bx bx-loader-alt bx-spin"></i>
            Generando…
          </>
        ) : (
          <>
            <i className="bx bx-sparkle"></i>
            Generar comida
          </>
        )}
      </button>

      {error && <p className="error-msg">{error}</p>}

      {/* Recipe result */}
      {recipe && !loading && (
        <>
          {/* Regenerar link */}
          <button
            className="btn-regenerate"
            onClick={handleGenerate}
            disabled={loading}
          >
            <i className="bx bx-refresh"></i>
            Regenerar
          </button>

          {/* Recipe card */}
          <div className="recipe-card-h">
            <Image
              src={foodImage}
              alt={recipe.name}
              width={110}
              height={110}
              className="recipe-img-h"
            />
            <div className="recipe-details">
              <p className="recipe-name-h">{recipe.name}</p>
              <p className="recipe-meal-label">{mealInfo?.label}</p>
              {mealInfo && (
                <div className="recipe-meta">
                  <i className="bx bx-time-five"></i>
                  <span>{mealInfo.prepMin} min</span>
                </div>
              )}
              {goalInfo && (
                <>
                  <div className="recipe-tag">
                    <i className="bx bx-leaf"></i>
                    <span>{goalInfo.benefit1}</span>
                  </div>
                  <div className="recipe-tag">
                    <i className="bx bx-heart"></i>
                    <span>{goalInfo.benefit2}</span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Reason box */}
          {recipe.reason && (
            <div className="recipe-reason-box">
              <i className="bx bx-bulb"></i>
              <p>{recipe.reason}</p>
            </div>
          )}

          {/* Ingredients */}
          <div className="ingredients-header">
            <span className="ingredients-title-h">Ingredientes</span>
            <button className="btn-swap-all" onClick={handleGenerate} disabled={loading}>
              Cambiar ingredientes
              <i className="bx bx-refresh"></i>
            </button>
          </div>

          <div className="ingredient-grid">
            {recipe.ingredients.map((ing, index) => {
              const imgData = ingredientImages[index];
              return (
                <div key={`${ing.name}-${index}`} className="ingredient-card">
                  <div className="ingredient-circle-wrap">
                    {imgData?.loading ? (
                      <div className="ingredient-circle-skeleton" />
                    ) : imgData?.url ? (
                      <Image
                        src={imgData.url}
                        alt={ing.name}
                        width={56}
                        height={56}
                        className="ingredient-circle-img"
                      />
                    ) : (
                      <i className={`${ing.icon} ingredient-circle-icon`}></i>
                    )}
                  </div>
                  <span className="ingredient-name">{ing.name}</span>
                  <button
                    className="btn-swap-ingredient"
                    onClick={() => handleSwapIngredient(index)}
                    title={`Cambiar ${ing.name}`}
                  >
                    <i className="bx bx-refresh"></i>
                  </button>
                </div>
              );
            })}
          </div>

          {/* Accept */}
          <div className="bottom-bar">
            <button className="btn-primary" onClick={() => setScreen("success")}>
              <i className="bx bx-check"></i>
              Me sirve
            </button>
          </div>
        </>
      )}
    </div>
  );
}
