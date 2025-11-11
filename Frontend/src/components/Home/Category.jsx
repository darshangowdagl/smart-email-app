import "./Category.css";

function Category({ selectedCategory, onCategoryChange }) {
  return (
    <div className="category-container">
      <div className="category-tabs">
        <button 
          className={`category-tab ${selectedCategory === "personal" ? "active" : ""}`}
          onClick={() => onCategoryChange("personal")}
        >
          Personal
        </button>
        <button 
          className={`category-tab ${selectedCategory === "promotions" ? "active" : ""}`}
          onClick={() => onCategoryChange("promotions")}
        >
          Promotions
        </button>
        <button 
          className={`category-tab ${selectedCategory === "spam" ? "active" : ""}`}
          onClick={() => onCategoryChange("spam")}
        >
          Spam
        </button>
        <button 
          className={`category-tab ${selectedCategory === "work" ? "active" : ""}`}
          onClick={() => onCategoryChange("work")}
        >
          Work
        </button>
      </div>
    </div>
  );
}

export default Category;
