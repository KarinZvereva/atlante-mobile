export enum Entities {
  Auth = "auth",
  Wineries = "wineries",
  Users = "users",
  POIs = "pointsofinterest",
  Journeys = "journeys",
  Stages = "stages",
  Assets = "assets",
  FormSchema = "formschema",
}

export enum WineAssociations {
  VinNatur = 1,
  ViniVeri = 2,
  ViTe = 4,
  VAN = 8,
  TripleA = 16,
  RawWine = 32,
}

export enum ExtraServices {
  BnB = 1,
  Restaurant = 2,
}

export enum EntityStatus {
  Proposed = 0,
  Evaluating = 10,
  Need_Revision = 20,
  Approved = 30,
  Rejected = 40,
}

export enum PointOfInterestType {
  Non_Specificato = 0,
  Osti_Ristori = 1,
  Borghi_Centri_Storici = 2,
  Castelli_Fortificazioni = 3,
  Chiese_Santuari_Monasteri = 4,
  Siti_Archeologici = 5,
  Siti_Naturalistici = 6,
  Siti_Marini_Fluviali_Lacustri = 7,
  Siti_Termali = 8,
  Dormire = 9,
}

export enum Roles {
  User = "User",
  PowerUser = "PowerUser",
  Staff = "Staff",
  Admin = "Admin",
  SuperAdmin = "SuperAdmin",
}
