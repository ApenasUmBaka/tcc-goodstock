// Types
/**
 * Member from team representation.
 */
interface Member {
  id: number;
  name: string;
  online: boolean;
}


// Classes
class MemberController {
  /**
   * A method to update the members in the table.
   */
  public static async updateMembersOnTable(): Promise<void> {
    // Remove all the members from the table.
    this.removeMembersFromTable();

    // Get the Members.
    const members = await MemberModel.getAllMembers();
    if (!members.length) return;

    // Set then in the table.
    this.setMembersInTable(members);
  }

  /**
   * a method to remove all the members from the table.
  */
  private static removeMembersFromTable(): void {
    // Save the headers.
    const headers = document.getElementById('table-members-headers') as HTMLTableRowElement;

    // Remove the entries.
    const tableElement = document.getElementById('section-members') as HTMLTableElement;
    while (tableElement.firstChild) {
      tableElement.removeChild(tableElement.firstChild);
    }

    // Set the header
    tableElement.appendChild(headers);
  }

  /**
   * A method to set all the members in the table.
  */
  private static setMembersInTable(members: Member[]) {
    // Loop through members.
    for (const member of members) {
      // Member ID
      const memberId = document.createElement('td');
      memberId.classList.add('entry-info');
      memberId.innerText = member.id.toString();

      // Member Name
      const memberName = document.createElement('td');
      memberName.classList.add('entry-info');
      memberName.innerText = member.name;

      // Member status
      const memberStatus = document.createElement('td');
      memberStatus.classList.add('entry-info');
      memberStatus.innerText = '●' ;

      // Set the color in the dot.
      if (member.online) memberStatus.classList.add('member-status-online');
      else memberStatus.classList.add('member-status-offline');

      // Add then to the table row.
      const tableElement = document.getElementById('section-members') as HTMLTableElement;
      const tableRow = document.createElement('tr');
      tableRow.classList.add('member-entry');
      tableRow.appendChild(memberId);
      tableRow.appendChild(memberName);
      tableRow.appendChild(memberStatus);

      // Add the row to the table.
      tableElement.appendChild(tableRow);
    }
  }
}