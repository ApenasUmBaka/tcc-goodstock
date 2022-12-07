// Functions
/**
 * A function to remove the current visible section.
 */
function toggleVisibleSection(nextSection: string) {
  // Remove the visible section.
  return () => {
    const oldSection = document.getElementsByClassName("section-visible")[0];
    oldSection.classList.add('hidden');
    oldSection.classList.remove("section-visible");

    // Show the wished section.
    const section = document.getElementById(nextSection)!;
    section.classList.add("section-visible");
    section.classList.remove('hidden');
  };
}

// Code
// Sidebar dashboard
document.getElementById("a-sidebar-dashboard")!.onclick =
  toggleVisibleSection("section-dashboard");

// Sidebar stock
document.getElementById("a-sidebar-stock")!.onclick = () => {
  toggleVisibleSection("section-stock")();
  ProductsController.refreshProducts();
};

// Sidebar Stock menu
document.getElementById('a-menu-products-add')!.onclick = () => {
  ProductsModalController.openModal();
};

// Sidebar members
document.getElementById('a-sidebar-members')!.onclick = async () => {
  toggleVisibleSection('section-members')();
  await MembersController.updateMembersOnTable.bind(MembersController)();
}

// Stock Form 
(document.getElementById('form-products-modal') as HTMLFormElement).onsubmit = (event: Event) => {
  event.preventDefault();
}