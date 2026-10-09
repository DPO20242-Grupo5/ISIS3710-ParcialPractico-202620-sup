export { };

function waitForHydration(selector: string) {
  cy.get(selector).should(($el) => {
    const hydrated = Object.keys($el[0]).some((p) =>
      p.startsWith("__reactProps$"),
    );
    expect(hydrated, `${selector} debe estar hidratado por React`).to.equal(true);
  });
}

describe("PlanCreationsSpec - Creación de un nuevo plan", () => {

  beforeEach(() => {
    cy.visit("http://localhost:3000/plans/new");

  });

  it("Debe mostrar los títulos de la página", () => {
    cy.get("h3").should("contain", "Crear un nuevo plan");
    cy.get("p").should("contain", "Organiza, invita a tus amigos o abre plazas para que otros miembros se sumen a vivir");
  })

  it("Debe mostrar los campos del formulario", () => {
    cy.get("#name").should("be.visible");
    cy.get("#address").should("be.visible");
    cy.get("#estimatedPrice").should("be.visible");
    cy.get("#estimatedTime").should("be.visible");
    cy.get("#description").should("be.visible");
    cy.get("#recomendations").should("be.visible");
    cy.get("#equipment").should("be.visible");
    cy.get("#image").should("be.visible");
    cy.get("button").should("contain", "Publicar plan");
  })

  it("Debe validar los campos del formulario", () => {
    cy.get("#name").type("Plan de prueba");
    cy.get("#address").type("Dirección de prueba");
    cy.get("#estimatedPrice").type("100");
    cy.get("#estimatedTime").type("10");
    cy.get("#description").type("Descripción de prueba");
    cy.get("#recomendations").type("Recomendaciones de prueba");
    cy.get("#equipment").type("Equipo de prueba");
    cy.get("#image").type("https://example.com/image.jpg");
    cy.get("button").click();
    cy.get("#name").should("have.class", "border-orange-700");
  })
  it("Debe Verificar si se carga correctamente", () => {
    cy.get("#name").type("Plan de prueba");
    cy.get("#address").type("Dirección de prueba");
    cy.get("#estimatedPrice").type("100");
    cy.get("#estimatedTime").type("10");
    cy.get("#description").type("Descripción de prueba");
    cy.get("#recomendations").type("Recomendaciones de prueba");
    cy.get("#equipment").type("Equipo de prueba");
    cy.get("#image").type("https://example.com/image.jpg");
    cy.get("button").click();
    cy.get("#name").should("have.class", "border-orange-700");
    cy.get("#address").should("have.class", "border-orange-700");
    cy.get("#estimatedPrice").should("have.class", "border-orange-700");
    cy.get("#estimatedTime").should("have.class", "border-orange-700");
    cy.get("#description").should("have.class", "border-orange-700");
    cy.get("#recomendations").should("have.class", "border-orange-700");
    cy.get("#equipment").should("have.class", "border-orange-700");
    cy.get("#image").should("have.class", "border-orange-700");
  })

  it("Debe mostrar mensaje de error si falta algún campo", () => {
    cy.get("#name").type("Plan de prueba");
    cy.get("#address").type("Dirección de prueba");
    cy.get("#estimatedPrice").type("100");
    cy.get("#estimatedTime").type("10");
    cy.get("#description").type("Descripción de prueba");
    cy.get("#recomendations").type("Recomendaciones de prueba");
    cy.get("#equipment").type("Equipo de prueba");
    cy.get("#image").type("https://example.com/image.jpg");
    cy.get("button").click();
    cy.get("#name").should("have.class", "border-orange-700");
    cy.get("#address").should("have.class", "border-orange-700");
    cy.get("#estimatedPrice").should("have.class", "border-orange-700");
    cy.get("#estimatedTime").should("have.class", "border-orange-700");
    cy.get("#description").should("have.class", "border-orange-700");
    cy.get("#recomendations").should("have.class", "border-orange-700");
    cy.get("#equipment").should("have.class", "border-orange-700");
    cy.get("#image").should("have.class", "border-orange-700");
  })

});