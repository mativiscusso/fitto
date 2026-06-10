"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Goal, MealType, Recipe, GOALS, MEAL_TYPES } from "@/types/recipe";

type Screen = "select" | "recipe" | "success";

const MEAL_ICONS: Record<MealType, string> = {
  desayuno: "🥣",
  almuerzo: "🍲",
  merienda: "🍵",
  cena: "🌙",
};

function SkeletonSelect() {
  return (
    <div className="skeleton-select">
      <div className="skeleton skeleton-logo"></div>
      <div className="skeleton skeleton-subtitle"></div>
      <div className="skeleton-grid">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="skeleton skeleton-grid-item"></div>
        ))}
      </div>
      <div className="skeleton-meal-grid">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="skeleton skeleton-meal-item"></div>
        ))}
      </div>
      <div className="skeleton skeleton-btn"></div>
    </div>
  );
}

function SkeletonRecipe() {
  return (
    <div className="recipe-screen">
      <div className="recipe-header">
        <div className="skeleton" style={{ width: 40, height: 40, borderRadius: 8 }}></div>
        <div className="skeleton" style={{ width: 100, height: 32, borderRadius: 20 }}></div>
      </div>
      <div className="skeleton-card">
        <div className="skeleton-image"></div>
        <div className="skeleton-content">
          <div className="skeleton skeleton-title"></div>
          <div className="skeleton skeleton-text"></div>
          <div className="skeleton-chips">
            <div className="skeleton skeleton-chip"></div>
            <div className="skeleton skeleton-chip"></div>
            <div className="skeleton skeleton-chip"></div>
          </div>
          <div className="skeleton-lines">
            <div className="skeleton skeleton-line"></div>
            <div className="skeleton skeleton-line-short"></div>
            <div className="skeleton skeleton-line"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [screen, setScreen] = useState<Screen>("select");
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);
  const [selectedMeal, setSelectedMeal] = useState<MealType | null>(null);
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const recipeHistory = useRef<string[]>([]);

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
          history: recipeHistory.current,
          forceNew: true,
        }),
      });
      const data = await res.json();

      if (data.error) {
        setError(data.error);
      } else {
        recipeHistory.current.push(data.recipe.name);
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
    if (!selectedGoal || !selectedMeal || !recipe) return;

    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          goal: selectedGoal,
          mealType: selectedMeal,
          history: recipeHistory.current,
          previousRecipe: recipe.name,
          forceNew: true,
        }),
      });
      const data = await res.json();

      if (data.error) {
        setError(data.error);
      } else {
        recipeHistory.current.push(data.recipe.name);
        setRecipe(data.recipe);
      }
    } catch (err) {
      setError("Error al generar otra receta.");
    } finally {
      setLoading(false);
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
    recipeHistory.current = [];
    setScreen("select");
    setError(null);
  };

  if (screen === "success") {
    return (
      <main className="container">
        <div className="success-message">
          <div className="success-icon">🎉</div>
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
    if (loading) {
      return (
        <main className="container">
          <SkeletonSelect />
        </main>
      );
    }

    return (
      <main className="container">
        <div className="logo-container">
          <div className="logo-shine"></div>
          <Image
            src="/fitto-logo.png"
            alt="Fitto"
            width={180}
            height={80}
            className="logo-image"
            priority
          />
        </div>
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
          className="btn-main"
          onClick={handleGenerate}
          disabled={!selectedGoal || !selectedMeal || loading}
        >
          Generar receta
        </button>
      </main>
    );
  }

  if (screen === "recipe") {
    const mealInfo = MEAL_TYPES.find((m) => m.id === selectedMeal);
    const mealEmoji = MEAL_ICONS[selectedMeal!];

    if (loading) {
      return (
        <main className="container">
          <SkeletonRecipe />
        </main>
      );
    }

    if (recipe) {
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
              <div className="recipe-image-placeholder">
                {mealEmoji}
              </div>
              <div className="recipe-content">
                <h2 className="recipe-name">{recipe.name}</h2>

                {recipe.reason && (
                  <div className="recipe-reason">
                    <span className="recipe-reason-icon">💡</span>
                    <span>{recipe.reason}</span>
                  </div>
                )}

                {recipe.calories && (
                  <p className="recipe-calories">~{recipe.calories} kcal</p>
                )}

                <h3 className="ingredients-title">Ingredientes</h3>
                <div className="ingredients-list">
                  {recipe.ingredients.map((ing, index) => (
                    <div key={index} className="ingredient-chip">
                      <span className="ingredient-icon">{ing.icon}</span>
                      <span>{ing.name}</span>
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
                ↻ Otra
              </button>
              <button className="btn-ok" onClick={() => setScreen("success")}>
                ✓ Me sirve
              </button>
            </div>
          </div>
        </main>
      );
    }
  }

  return null;
}