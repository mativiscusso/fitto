"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Goal, MealType, Recipe, GOALS, MEAL_TYPES, getRandomFoodImage, GOAL_ICON_COLORS } from "@/types/recipe";

type Screen = "select" | "recipe" | "success";

function SkeletonSelect() {
  return (
    <div className="skeleton-container">
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
      </div>
      <div className="fixed-bottom">
        <div className="skeleton skeleton-btn"></div>
      </div>
    </div>
  );
}

function SkeletonRecipe() {
  return (
    <div className="skeleton-recipe-container">
      <div className="skeleton-recipe">
        <div className="skeleton-recipe-header">
          <div className="skeleton skeleton-back"></div>
          <div className="skeleton skeleton-badge"></div>
        </div>
        <div className="skeleton-card">
          <div className="skeleton skeleton-image"></div>
          <div className="skeleton-content">
            <div className="skeleton skeleton-title"></div>
            <div className="skeleton skeleton-reason"></div>
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
      <div className="fixed-bottom">
        <div className="skeleton skeleton-btn"></div>
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
  const [foodImage, setFoodImage] = useState<string>('/bowl.jpg');

  const handleGenerate = async () => {
    if (!selectedGoal || !selectedMeal) return;

    setLoading(true);
    setError(null);
    setFoodImage(getRandomFoodImage());
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
    setFoodImage(getRandomFoodImage());
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
          <div className="success-icon">
            <i className="bx bx-party"></i>
          </div>
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
      return <SkeletonSelect />;
    }

    return (
      <main className="container">
        <div className="logo-container">
          <div className="logo-shine"></div>
          <Image
            src="/fitto-logo.png"
            alt="Fitto"
            width={160}
            height={70}
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
              <div
                className="goal-icon"
                style={{ color: GOAL_ICON_COLORS[goal.id] }}
              >
                <i className={`${goal.icon} bx-lg`}></i>
              </div>
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
              <div className="meal-icon">
                <i className={`${meal.icon} bx-md`}></i>
              </div>
              <div className="meal-label">{meal.label}</div>
            </button>
          ))}
        </div>

        {error && <p className="error-message">{error}</p>}

        <a href="/install" className="floating-btn">
          <i className="bx bx-download"></i>
        </a>

        <div className="fixed-bottom">
          <button
            className="btn-main"
            onClick={handleGenerate}
            disabled={!selectedGoal || !selectedMeal || loading}
          >
            Generar receta
          </button>
        </div>
      </main>
    );
  }

  if (screen === "recipe") {
    const mealInfo = MEAL_TYPES.find((m) => m.id === selectedMeal);

    if (loading) {
      return <SkeletonRecipe />;
    }

    if (recipe) {
      return (
        <main className="container">
          <div className="recipe-screen">
            <div className="recipe-header">
              <button className="btn-back" onClick={handleBack}>
                <i className="bx bx-chevron-left bx-lg"></i>
              </button>
              <span className="meal-type-badge">
                <i className={`${mealInfo?.icon} bx-sm`}></i>
                {mealInfo?.label}
              </span>
            </div>

            <div className="recipe-card">
              <Image
                src={foodImage}
                alt={recipe.name}
                width={600}
                height={400}
                className="recipe-image"
              />
              <div className="recipe-content">
                <h2 className="recipe-name">{recipe.name}</h2>

                {recipe.reason && (
                  <div className="recipe-reason">
                    <span className="recipe-reason-icon">
                      <i className="bx bx-bulb bx-sm"></i>
                    </span>
                    <span className="recipe-reason-text">{recipe.reason}</span>
                  </div>
                )}

                {recipe.calories && (
                  <p className="recipe-calories">~{recipe.calories} kcal</p>
                )}

                <h3 className="ingredients-title">Ingredientes</h3>
                <div className="ingredients-list">
                  {recipe.ingredients.map((ing, index) => (
                    <div key={index} className="ingredient-chip">
                      <span className="ingredient-icon">
                        <i className={`${ing.icon} bx-sm`}></i>
                      </span>
                      <span>{ing.name}</span>
                    </div>
                  ))}
                </div>

                {recipe.instructions && recipe.instructions.length > 0 && (
                  <div className="instructions-section">
                    <h3 className="instructions-title">Cómo prepararlo</h3>
                    <ol className="instructions-list">
                      {recipe.instructions.map((step, i) => (
                        <li key={i} className="instruction-step">
                          {step}
                        </li>
                      ))}
                    </ol>
                  </div>
                )}
              </div>
            </div>

            {error && <p className="error-message">{error}</p>}

            <a href="/install" className="floating-btn">
              <i className="bx bx-download"></i>
            </a>

            <div className="recipe-actions-fixed">
              <button className="btn-shuffle" onClick={handleShuffle} disabled={loading}>
                <i className="bx bx-refresh bx-sm"></i>
                Otra
              </button>
              <button className="btn-ok" onClick={() => setScreen("success")}>
                <i className="bx bx-check bx-sm"></i>
                Me sirve
              </button>
            </div>
          </div>
        </main>
      );
    }
  }

  return null;
}