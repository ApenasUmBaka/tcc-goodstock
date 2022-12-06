// Functions
/**
 * A function to remove the current visible section.
 */
function toggleVisibleSection(nextSection: string) {
  // Remove the visible section.
  return () => {
    const oldSection = document.getElementsByClassName("section-visible")[0];
    oldSection.classList.remove("section-visible");
    oldSection.setAttribute("style", "display:none");

    // Show the wished section.
    const section = document.getElementById(nextSection)!;
    section.classList.add("section-visible");
    section.removeAttribute("style");
  };
}

// Code
document.getElementById("a-sidebar-dashboard")!.onclick =
  toggleVisibleSection("section-dashboard");
document.getElementById("a-sidebar-stock")!.onclick = () => {
  toggleVisibleSection("section-stock")();
  ProductsController.refreshProducts();
};
document.getElementById('section-teams')!.onclick = 
  TeamsController.updateMembersOnTable.bind(TeamsController);