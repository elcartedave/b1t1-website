export interface Branch {
  id: string;
  latitude?: number;
  longitude?: number;
  address: string;
  imageUrl: string;
  imageURL: string;
  is24hours: boolean;
  resolvedAddress?: string;
  walkableCircle?: {
    radius: number;
    options: {
      fillColor: string;
      fillOpacity: number;
      strokeColor?: string;
    };
  };
  deliverableCircle?: {
    radius: number;
    options: {
      fillColor: string;
      fillOpacity: number;
      strokeColor?: string;
    };
  };
  franchisee: string; // display name
  region: string;
  location: string;
  last_evaluation?: Date | null;
  isSoonToOpenWithLoc?: boolean;
  isSoonToOpenWithoutLoc?: boolean;
  isOperating?: boolean;
  isCompanyOwned?: boolean;
  province?: string;
  timeslot?: string;
  municipality?: string;
  forLocation?: boolean;
  forRelocation?: boolean;
  dateFranchised?: Date | null;
  expiryDate?: Date | null;

  // New attributes from branches1 (all optional/nullable)
  memo?: string | null;
  status?:
    | "Operating"
    | "For Relocation"
    | "For Location"
    | "Soon To Open"
    | "For Refund"
    | "Permanently Closed"
    | null;
  hasDelivery?: boolean | null;
  markup?: number | null;
  signOfContractDate?: Date | null;
  endOfContractDate?: Date | null;
  datePurchased?: Date | null;
  franchiseAssistant?: string | null;
  openingDate?: Date | null;
  rnr?: boolean | null;
  franchiseeFee?: number | null;
  paymentTerms?: string | null;
  dateFullyPaid?: Date | null;
  scannedContract?: string | null;
  kiosk?: boolean | null;
  tinNumber?: string | null;
  idNumber?: string | null;
  numberOfYears?: number | null;
  contractWithFillup?: boolean | null;
  numberOfContract?: boolean | null;
  clientID?: boolean | null;
  registration?: boolean | null;
  waiver?: boolean | null;
  acknowledgementWaiver?: boolean | null;
  acknowledgmentReceipt?: boolean | null;
  proofOfPayment?: boolean | null;
  notarized?: boolean | null;
  signed?: boolean | null;
  extension?: boolean | null;
  // Additional attributes from original branches collection
  created_at?: Date | null;
  updated_at?: Date | null;
  // New boolean attributes
  mayors?: boolean | null;
  barangay?: boolean | null;
  dtiSec?: boolean | null;
  cor?: boolean | null;
  ptuAtp?: boolean | null;
  manualReceipts?: boolean | null;
  // Delivery service attributes
  hasDeliveryService?: boolean | null;
  grab?: boolean | null;
  foodPanda?: boolean | null;
  paymaya?: boolean | null;
}
