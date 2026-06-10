"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import {
  Goal, MealType, Recipe, Ingredient,
  GOALS, MEAL_TYPES,
} from "@/types/recipe";
import { INGREDIENT_CATALOG } from "@/lib/ingredients";

type Screen = "select" | "recipe" | "success";

export default function Home() {
  const [screen, setScreen] = useState<Screen>("select");
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);
  const [selectedMeal, setSelectedMeal] = useState<MealType | null>(null);
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [foodImage, setFoodImage] = useState<string | null>(null);
  const [foodImageLoading, setFoodImageLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const historyRef = useRef<string[]>([]);

  // ── Fetch recipe card image ─────────────────────────────────────────────
  const fetchRecipeImage = async (ingredients: Ingredient[]) => {
    setFoodImage(null);
    setFoodImageLoading(true);
    try {
      const ingredientNames = ingredients.slice(0, 3).map((ing) => {
        const catalogItem = INGREDIENT_CATALOG.find(
          (x) => x.id === ing.id || x.nameEs === ing.name
        );
        return catalogItem?.name ?? ing.name;
      });
      const res = await fetch("/api/recipe/image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ingredientNames }),
      });
      const data = await res.json();
      setFoodImage(data.url ?? null);
    } catch {
      setFoodImage(null);
    } finally {
      setFoodImageLoading(false);
    }
  };

  // ── Generate ────────────────────────────────────────────────────────────
  const callGenerate = async (goal: Goal, meal: MealType) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ goal, mealType: meal, history: historyRef.current }),
      });
      const data = await res.json();
      if (data.error) { setError(data.error); return false; }
      historyRef.current.push(data.templateId || data.recipe.id);
      setRecipe(data.recipe);
      fetchRecipeImage(data.recipe.ingredients);
      return true;
    } catch {
      setError("Error al generar. Intentá de nuevo.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleGenerate = async () => {
    if (!selectedGoal || !selectedMeal) return;
    const ok = await callGenerate(selectedGoal, selectedMeal);
    if (ok) setScreen("recipe");
  };

  const handleRegenerate = async () => {
    if (!selectedGoal || !selectedMeal) return;
    await callGenerate(selectedGoal, selectedMeal);
  };

  // ── Swap one ingredient (same category, no image needed) ────────────────
  const handleSwapOne = (index: number) => {
    if (!recipe) return;
    const current = recipe.ingredients[index];
    const catalogItem = INGREDIENT_CATALOG.find(
      (x) => x.id === current.id || x.nameEs === current.name
    );
    if (!catalogItem) return;

    const usedIds = recipe.ingredients.map((i) => i.id).filter(Boolean);
    const alts = INGREDIENT_CATALOG.filter(
      (x) =>
        x.category === catalogItem.category &&
        x.id !== catalogItem.id &&
        !usedIds.includes(x.id)
    );
    if (!alts.length) return;

    const picked = alts[Math.floor(Math.random() * alts.length)];
    const newIng: Ingredient = {
      id: picked.id,
      name: picked.nameEs,
      icon: current.icon,
      emoji: current.emoji,
      serving: current.serving,
      category: picked.category,
      substitutes: [],
    };
    setRecipe({
      ...recipe,
      ingredients: recipe.ingredients.map((ing, i) => (i === index ? newIng : ing)),
    });
  };

  const handleRestart = () => {
    setScreen("select");
    setSelectedGoal(null);
    setSelectedMeal(null);
    setRecipe(null);
    setError(null);
    setFoodImage(null);
    setFoodImageLoading(false);
    historyRef.current = [];
  };

  // ── Success ─────────────────────────────────────────────────────────────
  if (screen === "success") {
    return (
      <div className="screen">
        <div className="success-screen">
          <div className="success-icon"><i className="bx bx-check-circle"></i></div>
          <h2 className="success-title">¡Buena elección!</h2>
          <p className="success-text">¡A preparar!</p>
          <button className="btn-new" onClick={handleRestart}>
            <i className="bx bx-refresh"></i>
            Nueva receta
          </button>
        </div>
      </div>
    );
  }

  // ── Recipe screen ────────────────────────────────────────────────────────
  if (screen === "recipe" && recipe) {
    const mealInfo = MEAL_TYPES.find((m) => m.id === selectedMeal);
    const goalInfo = GOALS.find((g) => g.id === selectedGoal);

    return (
      <div className="screen">
        <div className="recipe-screen">
          {/* Header */}
          <div className="recipe-header">
            <button
              className="btn-back"
              onClick={() => { setScreen("select"); setRecipe(null); setError(null); }}
            >
              <i className="bx bx-chevron-left"></i>
            </button>
            {mealInfo && (
              <span className="meal-badge">
                <i className={`${mealInfo.icon} bx-xs`}></i>
                {mealInfo.label}
              </span>
            )}
          </div>

          {/* Recipe card */}
          <div className="recipe-card-h">
            {foodImageLoading || !foodImage ? (
              <div className="recipe-img-skeleton" aria-hidden />
            ) : (
              <Image
                src={foodImage}
                alt={recipe.name}
                width={110}
                height={110}
                className="recipe-img-h"
              />
            )}
            <div className="recipe-details">
              <p className="recipe-name-h">{recipe.name}</p>
              <p className="recipe-type-label">{mealInfo?.label}</p>
              {mealInfo && (
                <div className="recipe-meta">
                  <i className="bx bx-time-five"></i>
                  <span>{mealInfo.prepMin} min</span>
                  {recipe.calories && (
                    <>
                      <span style={{ color: "var(--border-strong)" }}>·</span>
                      <i className="bx bx-bolt"></i>
                      <span>{recipe.calories} kcal</span>
                    </>
                  )}
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

          {/* Regenerar */}
          <button className="btn-regenerate" onClick={handleRegenerate} disabled={loading}>
            {loading
              ? <><i className="bx bx-loader-alt bx-spin"></i> Generando…</>
              : <><i className="bx bx-refresh"></i> Regenerar</>
            }
          </button>

          {/* Reason */}
          {recipe.reason && (
            <div className="recipe-reason-box">
              <i className="bx bx-bulb"></i>
              <p>{recipe.reason}</p>
            </div>
          )}

          {/* Ingredients */}
          <p className="section-label" style={{ marginBottom: 10 }}>Ingredientes</p>
          <div className="ingredient-list">
            {recipe.ingredients.map((ing, index) => (
              <div key={`${ing.name}-${index}`} className="ingredient-row">
                <span className="ingredient-emoji">{ing.emoji ?? "🍽️"}</span>
                <span className="ingredient-row-name">{ing.name}</span>
                <span className="ingredient-row-serving">{ing.serving}</span>
                <button
                  className="btn-swap-one"
                  onClick={() => handleSwapOne(index)}
                  title={`Cambiar ${ing.name}`}
                >
                  <i className="bx bx-refresh"></i>
                </button>
              </div>
            ))}
          </div>

          {/* Preparation */}
          {recipe.instructions && recipe.instructions.length > 0 && (
            <>
              <p className="section-label" style={{ marginTop: 22, marginBottom: 10 }}>Preparación</p>
              <ol className="prep-steps">
                {recipe.instructions.map((step, i) => (
                  <li key={i} className="prep-step">
                    <span className="prep-step-num">{i + 1}</span>
                    <span className="prep-step-text">{step}</span>
                  </li>
                ))}
              </ol>
            </>
          )}

          {error && <p className="error-msg" style={{ marginTop: 16 }}>{error}</p>}
        </div>

        <div className="bottom-bar">
          <button className="btn-primary" onClick={() => setScreen("success")}>
            <i className="bx bx-check"></i>
            Me sirve
          </button>
        </div>
      </div>
    );
  }

  // ── Select screen ────────────────────────────────────────────────────────
  return (
    <div className="screen">
      <div className="logo-wrap">
        <Image
          src="/fitto-logo.png"
          alt="Fitto"
          width={130}
          height={55}
          className="logo-img"
          priority
        />
      </div>

      <p className="section-label">¿Qué querés mejorar?</p>
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
                <i className={goal.icon}></i>
              </div>
              <div className="goal-item-text">
                <div className="goal-item-label">{goal.label}</div>
                <div className="goal-item-desc">{goal.description}</div>
              </div>
              <div className="goal-radio">
                {isSelected && <i className="bx bx-check"></i>}
              </div>
            </button>
          );
        })}
      </div>

      <p className="section-label">¿Para qué comida?</p>
      <div className="meal-tabs-wrap">
        <div className="meal-tabs">
          {MEAL_TYPES.map((meal) => (
            <button
              key={meal.id}
              className={`meal-tab ${selectedMeal === meal.id ? "selected" : ""}`}
              onClick={() => setSelectedMeal(meal.id)}
            >
              {meal.label}
            </button>
          ))}
        </div>
      </div>

      {error && <p className="error-msg">{error}</p>}

      <div className="bottom-bar">
        <button
          className="btn-primary"
          onClick={handleGenerate}
          disabled={!selectedGoal || !selectedMeal || loading}
        >
          {loading ? (
            <><i className="bx bx-loader-alt bx-spin"></i> Generando…</>
          ) : (
            <><i className="bx bx-sparkle"></i> Generar comida</>
          )}
        </button>
      </div>
    </div>
  );
}
