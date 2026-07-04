import React from "react";
import { FaTimes } from "react-icons/fa";

const serif = { fontFamily: "'Fraunces', serif", fontWeight: 600 };

const RecipeForm = ({
  formData,
  setFormData,
  onSubmit,
  onCancel,
  editingRecipe,
}) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleIngredientChange = (index, field, value) => {
    const updatedIngredients = [...formData.strIngredients];
    updatedIngredients[index][field] = value;
    setFormData((prev) => ({ ...prev, strIngredients: updatedIngredients }));
  };

  const addIngredientField = () => {
    setFormData((prev) => ({
      ...prev,
      strIngredients: [...prev.strIngredients, { ingredient: "", measure: "" }],
    }));
  };

  const removeIngredientField = (index) => {
    if (formData.strIngredients.length <= 1) return;
    const updatedIngredients = formData.strIngredients.filter(
      (_, i) => i !== index,
    );
    setFormData((prev) => ({ ...prev, strIngredients: updatedIngredients }));
  };

  return (
    <div className="bg-[#FFFBF3] border border-[#E4D9C5] rounded-sm p-6 mb-8">
      <h2 className="text-2xl text-[#2B2420] mb-6" style={serif}>
        {editingRecipe ? "Edit Recipe" : "Add New Recipe"}
      </h2>
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-[#2B2420] mb-2">
              Recipe Name *
            </label>
            <input
              type="text"
              name="strMeal"
              value={formData.strMeal}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-[#FAF3E7] border border-[#E4D9C5] rounded-sm focus:ring-2 focus:ring-[#C1440E]/40 focus:border-[#C1440E] outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#2B2420] mb-2">
              Category *
            </label>
            <input
              type="text"
              name="strCategory"
              value={formData.strCategory}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-[#FAF3E7] border border-[#E4D9C5] rounded-sm focus:ring-2 focus:ring-[#C1440E]/40 focus:border-[#C1440E] outline-none"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-[#2B2420] mb-2">
              Cuisine Area *
            </label>
            <input
              type="text"
              name="strArea"
              value={formData.strArea}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-[#FAF3E7] border border-[#E4D9C5] rounded-sm focus:ring-2 focus:ring-[#C1440E]/40 focus:border-[#C1440E] outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#2B2420] mb-2">
              Image URL *
            </label>
            <input
              type="url"
              name="strMealThumb"
              value={formData.strMealThumb}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-[#FAF3E7] border border-[#E4D9C5] rounded-sm focus:ring-2 focus:ring-[#C1440E]/40 focus:border-[#C1440E] outline-none"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-[#2B2420] mb-2">
            Instructions *
          </label>
          <textarea
            name="strInstructions"
            value={formData.strInstructions}
            onChange={handleInputChange}
            rows="4"
            className="w-full px-4 py-2 bg-[#FAF3E7] border border-[#E4D9C5] rounded-sm focus:ring-2 focus:ring-[#C1440E]/40 focus:border-[#C1440E] outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#2B2420] mb-2">
            YouTube URL (optional)
          </label>
          <input
            type="url"
            name="strYoutube"
            value={formData.strYoutube}
            onChange={handleInputChange}
            className="w-full px-4 py-2 bg-[#FAF3E7] border border-[#E4D9C5] rounded-sm focus:ring-2 focus:ring-[#C1440E]/40 focus:border-[#C1440E] outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#2B2420] mb-2">
            Tags (comma separated)
          </label>
          <input
            type="text"
            name="strTags"
            value={formData.strTags}
            onChange={handleInputChange}
            placeholder="e.g. spicy, vegan, quick"
            className="w-full px-4 py-2 bg-[#FAF3E7] border border-[#E4D9C5] rounded-sm focus:ring-2 focus:ring-[#C1440E]/40 focus:border-[#C1440E] outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#2B2420] mb-2">
            Ingredients
          </label>
          {formData.strIngredients.map((item, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                placeholder="Ingredient"
                value={item.ingredient}
                onChange={(e) =>
                  handleIngredientChange(index, "ingredient", e.target.value)
                }
                className="flex-1 px-4 py-2 bg-[#FAF3E7] border border-[#E4D9C5] rounded-sm focus:ring-2 focus:ring-[#C1440E]/40 focus:border-[#C1440E] outline-none"
              />
              <input
                type="text"
                placeholder="Measure"
                value={item.measure}
                onChange={(e) =>
                  handleIngredientChange(index, "measure", e.target.value)
                }
                className="flex-1 px-4 py-2 bg-[#FAF3E7] border border-[#E4D9C5] rounded-sm focus:ring-2 focus:ring-[#C1440E]/40 focus:border-[#C1440E] outline-none"
              />
              <button
                type="button"
                onClick={() => removeIngredientField(index)}
                className="px-3 py-2 bg-[#C1440E]/10 text-[#C1440E] rounded-sm hover:bg-[#C1440E]/20 transition-colors"
              >
                <FaTimes />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addIngredientField}
            className="text-sm text-[#C1440E] hover:text-[#a3390b] transition-colors"
          >
            + Add Ingredient
          </button>
        </div>

        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            className="px-6 py-2 bg-[#C1440E] text-[#FAF3E7] rounded-sm hover:bg-[#a3390b] transition-colors shadow-[3px_3px_0_0_#2B2420]"
          >
            {editingRecipe ? "Update Recipe" : "Create Recipe"}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 bg-[#FAF3E7] border border-[#E4D9C5] rounded-sm hover:bg-[#FFFBF3] transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default RecipeForm;
