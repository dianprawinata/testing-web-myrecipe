import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import App from "./App";

const appData = {
  image: {
    testId: "image-banner",
    alt: "banner",
    src: "https://www.instacart.com/company/wp-content/uploads/2022/11/cooking-statistics-hero.jpg",
  },
};

describe("renders App component with NavBar, image banner, and Footer", () => {
  test("should have image banner rendered and have image source", async () => {
    render(<App />);

    /// App main jsx
    // image banner is rendered and have image source
    const banner = screen.getByTestId(appData.image.testId);
    expect(banner).toBeInTheDocument();
    expect(banner).toHaveProperty("src", appData.image.src);
    expect(banner).toHaveProperty("alt", appData.image.alt);
  });
});

describe("App Component", () => {
  beforeAll(() => {
    global.fetch = jest.fn();
  });

  test("should render Card components based on fetched recipes", async () => {
    // Mock API response
    const mockData = {
      recipes: [
        {
          id: 1,
          name: "Recipe 1",
          image: "image1.jpg",
          rating: 4.5,
          tags: ["tag1", "tag2"],
        },
        {
          id: 2,
          name: "Recipe 2",
          image: "image2.jpg",
          rating: 3.5,
          tags: ["tag3", "tag4"],
        },
        {
          id: 3,
          name: "Recipe 3",
          image: "image3.jpg",
          rating: 5,
          tags: ["tag5", "tag6"],
        },
      ],
    };

    // Mock fetch to return a resolved promise with mock data
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockData),
      })
    );

    // Render the App component
    render(<App />);

    // Using await with findBy queries
    const img1 = await screen.findByTestId(`img-recipe-1`);
    const title1 = await screen.findByTestId(`title-recipe-1`);

    const img2 = await screen.findByTestId(`img-recipe-2`);
    const title2 = await screen.findByTestId(`title-recipe-2`);

    const img3 = await screen.findByTestId(`img-recipe-3`);
    const title3 = await screen.findByTestId(`title-recipe-3`);

    // Assertions
    expect(img1).toBeInTheDocument();
    expect(title1).toHaveTextContent("Recipe 1");

    expect(img2).toBeInTheDocument();
    expect(title2).toHaveTextContent("Recipe 2");

    expect(img3).toBeInTheDocument();
    expect(title3).toHaveTextContent("Recipe 3");
  });
});

describe("error", () => {
  beforeAll(() => {
    global.fetch = jest.fn();
  });

  test("should handle error in fetchUsers and log the error", async () => {
    // Mock the fetch to return a rejected promise
    const errorMessage = "Failed to fetch";
    fetch.mockRejectedValueOnce(new Error(errorMessage));

    // Mock `console.log` to assert it is called
    const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});

    // Render the component
    render(<App />);

    // Wait for the effect to run and fetchUsers to be called
    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith(expect.any(Error));
    });

    // Cleanup the mock
    consoleSpy.mockRestore();
  });
});
