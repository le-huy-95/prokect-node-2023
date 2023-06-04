'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Projects extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Projects.belongsTo(models.Status_Received_money, { foreignKey: "receiveMoneyId" });

      Projects.belongsTo(models.Status_Delivery, { foreignKey: "statusDeliveryId" });
      Projects.belongsTo(models.Status_Payment, { foreignKey: "statusPaymentId" });
      Projects.belongsToMany(models.User, { through: "Project_Users" /* options */, foreignKey: "projectId" });
      Projects.belongsTo(models.Shipping_Unit, { foreignKey: "shippingUnit_Id" });
      Projects.belongsTo(models.Customer, { foreignKey: "customerId" });
      Projects.belongsTo(models.Sales_Channel, { foreignKey: "salesChannelId" });
      Projects.belongsToMany(models.Image, { through: "Projects_Image" /* options */, foreignKey: "projectId" });

      Projects.belongsTo(models.Status_Pickup, { foreignKey: "statuspickupId" });
      Projects.belongsTo(models.Status_Warehouse, { foreignKey: "statuswarehouseId" });
      Projects.hasMany(models.Chat, { foreignKey: "projectId" });
      Projects.belongsTo(models.Province_customer, { foreignKey: "Province_customerId" });


      Projects.belongsTo(models.District_customer, { foreignKey: "District_customerId" });
      Projects.belongsTo(models.Ward_customer, { foreignKey: "Ward_customerId" });
      Projects.belongsTo(models.Address_Province, { foreignKey: "Address_provinceId" });
      Projects.belongsTo(models.Address_District, { foreignKey: "Address_DistrictId" });
      Projects.belongsTo(models.Address_Ward, { foreignKey: "Address_WardId" });
      Projects.belongsTo(models.Warehouse, { foreignKey: "ProductId" });

    }
  };
  Projects.init({
    order: DataTypes.STRING,
    ProductId: DataTypes.INTEGER,
    quantity: DataTypes.STRING,
    money: DataTypes.STRING,
    shippingUnit_Id: DataTypes.INTEGER,
    shipping_Cost: DataTypes.STRING,
    From_address: DataTypes.STRING,
    To_address: DataTypes.STRING,
    total: DataTypes.STRING,
    totalWithShippingCost: DataTypes.STRING,
    createdBy: DataTypes.STRING,
    customerId: DataTypes.INTEGER,
    Note: DataTypes.STRING,
    name_customer: DataTypes.STRING,
    age_customer: DataTypes.STRING,
    phoneNumber_customer: DataTypes.STRING,
    addressDetail: DataTypes.STRING,
    Province_customerId: DataTypes.INTEGER,
    District_customerId: DataTypes.INTEGER,
    Ward_customerId: DataTypes.INTEGER,
    salesChannelId: DataTypes.INTEGER,
    statusDeliveryId: DataTypes.INTEGER,
    statusPaymentId: DataTypes.INTEGER,
    statuspickupId: DataTypes.INTEGER,
    statuswarehouseId: DataTypes.INTEGER,
    Notemore: DataTypes.STRING,
    Pricedrop: DataTypes.STRING,
    Netsalary: DataTypes.STRING,
    paid: DataTypes.STRING,
    receiveMoneyId: DataTypes.INTEGER,
    address_pick_up: DataTypes.STRING,
    Address_provinceId: DataTypes.INTEGER,
    Address_DistrictId: DataTypes.INTEGER,
    Address_WardId: DataTypes.INTEGER,
    Detail_Place_of_receipt: DataTypes.STRING,
    flag: DataTypes.BOOLEAN,
    done_status: DataTypes.STRING,
    Vehicle_pickup: DataTypes.STRING,
    Vehicle_delivery: DataTypes.STRING,
    Sub_money: DataTypes.STRING,
    Cancel_reason: DataTypes.STRING,
    Account_number: DataTypes.STRING,
    Bank_name: DataTypes.STRING,
    Status_product: DataTypes.STRING,
    User_PickUp: DataTypes.STRING,
    Number_PickUp: DataTypes.STRING,
    User_Warehouse: DataTypes.STRING,
    Number_Warehouse: DataTypes.STRING,
    User_Delivery: DataTypes.STRING,
    Number_Delivery: DataTypes.STRING,
    User_Overview: DataTypes.STRING,
    Number_Overview: DataTypes.STRING,
    Notice_PickUp: DataTypes.STRING,
    Notice_Warehouse: DataTypes.STRING,
    Notice_Delivery: DataTypes.STRING,
    pickup_time: DataTypes.STRING,
    pickupDone_time: DataTypes.STRING,
    warehouse_time: DataTypes.STRING,
    warehouseDone_time: DataTypes.STRING,
    Delivery_time: DataTypes.STRING,
    DeliveryDone_time: DataTypes.STRING,
    Overview_time: DataTypes.STRING,
    OverviewDone_time: DataTypes.STRING,
    createdByName: DataTypes.STRING,
    unit: DataTypes.STRING,
    unit_money: DataTypes.STRING,
    Main_Account: DataTypes.STRING,
    name_account: DataTypes.STRING,
    Mode_of_payment: DataTypes.STRING,

  }, {
    sequelize,
    modelName: 'Projects',
  });
  return Projects;
};