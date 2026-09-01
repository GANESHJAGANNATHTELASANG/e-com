import { createUsersTable } from "../models/userTable.js";
import { createProductsTable } from "../models/productTable.js";
import { createProductReviewsTable } from "../models/productReviewTbale.js";
import { createOrdersTable } from "../models/orderTable.js";
import { createOrderItemTable } from "../models/orderIteamTable.js";
import { createShippingInfoTable } from "../models/shuppingInfoTable.js";
import { createPaymentsTable } from "../models/paymentTable.js";

export const createTables = async () => {
  try {
    await createUsersTable();
    await createProductsTable();
    await createProductReviewsTable();
    await createOrdersTable();
    await createOrderItemTable();
    await createShippingInfoTable();
    await createPaymentsTable();
    console.log("✅ All Tables Created Successfully.");
  } catch (error) {
    console.log("❌ Failed To Create Tables.", error);
    process.exit(1);
  }
};
