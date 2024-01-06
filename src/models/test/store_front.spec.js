import { describe, it} from "node:test";
import { StorefrontStore } from "../store_front";

const store = new StorefrontStore();

describe('Storefront Model', () => {
    it('should have getAllItems method', () => {
      expect(store.addNewItems()).toBeDefined();
    });
  
    it('getAllItems method should return a list of items', async () => {
      const result = await store.getAllItems();
      expect(result).not.toEqual([]);
    });

    /////////////////////////////////////////////////////////
    it('should have a getAllUsers metho', () => {
      expect(store.getAllUsers()).toBeDefined();
    });

    it('the getAllUsers method should return a list of users', async () => {
      const allUsers = await store.getAllUsers();
      expect(allUsers).toEqual([]);
    });

    ////////////////////////////////////////////////////////
    it('should have a getAllUsers metho', () => {
      expect(store.getUserById()).toBeDefined();
    });

    it('the getAllUsers method should return a list of users', async () => {
      const userById = await store.getUserById();
      expect(userById).toEqual([]);
    });

    ////////////////////////////////////////////////////////

    it('should have a getAllUsers metho', () => {
      expect(store.addNewItems()).toBeDefined();
    });

    it('the getAllUsers method should return a list of users', async () => {
      const addNewUser = await store.addNewItems();
      expect(addNewUser).toEqual([]);
    });
  });


  // "test": "SET ENV=test && npx tsc && db-migrate --env test up && jasmine && db-migrate db:drop test"