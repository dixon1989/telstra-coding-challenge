describe("Telstra Challenge Page", () => {
  it("toy robot simulator page should successfully loads", () => {
    cy.visit("/"); // change URL to match your dev URL
  });
});

describe("Telstra Challenge Page Scenario A", () => {
  it("toy robot should achieve the Scenario A", () => {
    cy.get("input[type=text]").type("PLACE 0,0,NORTH{enter}");
    cy.get("input[type=text]").type("MOVE{enter}");
    cy.get("input[type=text]").type("REPORT{enter}");
    cy.get("li").last().contains("Output: 0,1,NORTH");
    cy.get("button").contains("Reset").click();
  });
});

describe("Telstra Challenge Page Scenario B", () => {
  it("toy robot should achieve the Scenario B", () => {
    cy.get("input[type=text]").type("PLACE 0,0,NORTH{enter}");
    cy.get("input[type=text]").type("LEFT{enter}");
    cy.get("input[type=text]").type("REPORT{enter}");
    cy.get("li").last().contains("Output: 0,0,WEST");
    cy.get("button").contains("Reset").click();
  });
});

describe("Telstra Challenge Page Scenario C", () => {
  it("toy robot should achieve the Scenario C", () => {
    cy.get("input[type=text]").type("PLACE 1,2,EAST{enter}");
    cy.get("input[type=text]").type("MOVE{enter}");
    cy.get("input[type=text]").type("MOVE{enter}");
    cy.get("input[type=text]").type("LEFT{enter}");
    cy.get("input[type=text]").type("MOVE{enter}");
    cy.get("input[type=text]").type("REPORT{enter}");
    cy.get("li").last().contains("Output: 3,3,NORTH");
    cy.get("button").contains("Reset").click();
  });
});

describe("Telstra Challenge Page Scenario D", () => {
  it("toy robot should achieve the Scenario D", () => {
    cy.get("input[type=text]").type("PLACE 1,2,EAST{enter}");
    cy.get("input[type=text]").type("MOVE{enter}");
    cy.get("input[type=text]").type("LEFT{enter}");
    cy.get("input[type=text]").type("MOVE{enter}");
    cy.get("input[type=text]").type("PLACE 3,1{enter}");
    cy.get("input[type=text]").type("MOVE{enter}");
    cy.get("input[type=text]").type("REPORT{enter}");
    cy.get("li").last().contains("Output: 3,2,NORTH");
    cy.get("button").contains("Reset").click();
  });
});
