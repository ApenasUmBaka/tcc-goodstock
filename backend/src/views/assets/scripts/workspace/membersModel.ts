// Classes
class MemberModel {
  /**
   * A method to get all the members and their status.
  */
   public static async getAllMembers(): Promise<Member[]> {
    const res = await fetch(`/members`, {
      method: 'GET',
      credentials: "include",
    });

    return (await res.json()).data;
  }
}