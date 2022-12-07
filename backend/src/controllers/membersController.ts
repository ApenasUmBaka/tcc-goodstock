// Libs
import { Request, Response } from "express";

import CustomersModel from "@models/customersModel";
import { User } from "@types";

// Classes
class MembersController {
  /**
   * GET /members
   * A method to get all the members from the organization and their status.
  */
  public static async get(req: Request, res: Response) {
    // Check if the user is logged.
    if (!req.session.user?.id) {
      req.logger.info('User not logged in.');
    }

    // Get all customers from the organizations.
    const customersModel = new CustomersModel(req.logger);
    let customersResult = await customersModel.getCustomerByQuery({
      fk_organizationId: req.session.user?.organizationId
    });
    if (!customersResult) customersResult = [];

    // Get all users that has a session and treat the results.
    req.logger.info('Getting all users that has a session...');
    const members: {id: number; name: string; status: boolean}[] = [];
    req.sessionStore.all!((err, sessionsInStore) => {
      // Define the session as json
      if (err || !sessionsInStore) return;
      const sessions = JSON.parse(JSON.stringify(sessionsInStore));
      for (const index in sessions) {
        const session = sessions[index];
        const user: User = session.user;
        if (!user.name) continue;

        // Check if the members already was added (two or more clients)
        if (members.find((member) => {
          if (member.id == user.id) return true;
        })) continue;

        // Add to the array.
        members.push({
          id: user.id!,
          name: user.name,
          status: true
        });
      }
      
          // Add the users that has not a session.
    req.logger.info('Adding users that has not an activate session...');
    for (const customer of customersResult!) {
      // Search by the customer in the members list.
      const member = members.find((member) => {
        if (member.id == customer.id) return true;
        return false;
      });

      // Add the customer to the members list.
      if (member) continue;
      members.push({
        id: customer.id,
        name: customer.name,
        status: false
      });


    }

    // Return the result to the client.
    req.logger.info('Returning the result to the client...');
    res.status(200).json({
      status: 'Success',
      data: members
    });
    });
  }
}


// Code
export default MembersController;