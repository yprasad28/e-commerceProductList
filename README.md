
# 🛍️ E-Commerce Product List

A modern e-commerce product listing web application built with React and Tailwind CSS. It displays a catalog of products fetched from a public API and provides filtering and sorting features for a better user experience.

---

## 📦 Installation & Running the Project

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yprasad28/e-commerceProductList.git
   cd e-commerceProductList
## Install dependencies:

npm install

## Run the development server:

npm run dev

## Open your browser and navigate to:
http://localhost:5173


## 🗂️ Project Structure

src/
├── components/   
│   ├── BookCard.tsx
│   ├── FilterContext.tsx
│   ├── MainContent.tsx
│   ├── ProductPage.tsx                                                       
│   └── Sidebar.tsx
├── pages/              
│   └── Home.tsx
├── types/              
├── App.tsx            
├── main.tsx           
└── index.css        

## 🌐 Data Fetching Strategy

All product data is fetched from the public API:
🔗 https://fakestoreapi.com/products

Justification:

This API provides a wide variety of product data ideal for frontend testing.

It supports GET requests for full product lists and single product details.

Data is fetched using useEffect on initial render and stored in state.

## 🎨 Styling Method Used
The application uses Tailwind CSS, a utility-first CSS framework, for rapid UI development and responsive design.
Tailwind allows for consistent styling directly in JSX with class names.

## ✨ Bonus Features Implemented

✅ React Router for page navigation (/, /product/:id)

✅ Product detail page

✅ Filter by category

✅ Sort by price (Low to High / High to Low)

✅ Responsive design with Tailwind CSS

✅ Error handling for failed API responses

## 🚀 Future Enhancements

Add a shopping cart system

Implement user authentication

Add search functionality

Add loading spinners during API calls

# 📄 License

This project is open-source and licensed under the MIT License.
