export interface Invoice {
    invoiceId: string;
    vendorId: string;
    invoiceNumber: string;
    invoiceAmount: number;
    invoiceCurrencyId: string;
    invoiceReceivedDate: Date;
    invoiceDueDate: Date;
    isActive: boolean;
}
  