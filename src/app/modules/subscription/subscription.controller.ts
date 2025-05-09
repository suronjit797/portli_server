import globalController from "../../global/global.controller";

import SubscriptionService from "./subscription.service";

// variables
const name = "Subscription";

// global
const globalControllers = globalController(SubscriptionService, name);

const SubscriptionController = { ...globalControllers };
export default SubscriptionController;
