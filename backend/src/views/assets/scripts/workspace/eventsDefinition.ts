// Functions
/**
 * A function to remove the current visible section.
 */
function toggleVisibleSection(nextSection: string) {
  // Remove the visible section.
  return () => {
    const oldSection = document.getElementsByClassName("section-visible")[0];
    oldSection.classList.remove("section-visible");
    oldSection.classList.toggle('hidden');

    // Show the wished section.
    const section = document.getElementById(nextSection)!;
    section.classList.add("section-visible");
    oldSection.classList.toggle('hidden');
  };
}

// Code
document.getElementById("a-sidebar-dashboard")!.onclick =
  toggleVisibleSection("section-dashboard");
document.getElementById("a-sidebar-stock")!.onclick = () => {
  toggleVisibleSection("section-stock")();
  ProductsController.refreshProducts();
};
document.getElementById('a-sidebar-members')!.onclick = () => {
  toggleVisibleSection('section-members');
  MembersController.updateMembersOnTable.bind(MembersController)();
}