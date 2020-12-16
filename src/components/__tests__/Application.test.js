import React from "react";

import { 
  render, cleanup, 
  waitForElement, queryByText, 
  fireEvent, getByPlaceholderText, 
  prettyDOM, getByAltText, 
  getByText, getAllByTestId,
  queryByAltText
} from "@testing-library/react";

import Application from "components/Application";

// I'm using a get request to update days and therefore all tests
// gauging spot count have not been included in integration testing
// and were tested using Cypress

afterEach(cleanup);

describe("Application", () => {

  //  When defining a fct as async it needs to be defined as the callback
  it("defaults to Monday and changes the schedule when a new day is selected", async () =>  {
      
    const { getByText } = render(<Application />);

    await waitForElement(() => getByText("Monday"));
  
    fireEvent.click(getByText("Tuesday"))
    
    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });

  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () =>  {
      
    const { container, debug } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));
  
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];
    
    console.log(prettyDOM(container));
    fireEvent.click(getByAltText(appointment, "Add"));
  
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });

    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
  
    fireEvent.click(getByText(appointment, "Save"));
  

    expect(getByText(appointment, "Saving...")).toBeInTheDocument();

    await waitForElement(() => queryByText(appointment, "Lydia Miller-Jones"));

  });

  it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
    // 1. Render the Application.
    const { container } = render(<Application />);
  
    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));
  
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );

    fireEvent.click(queryByAltText(appointment, "Delete"));

    expect(getByText(container, "DO IT, I double dare you")).toBeInTheDocument();
    fireEvent.click(getByText(appointment, "Confirm"));

  });
  
});

