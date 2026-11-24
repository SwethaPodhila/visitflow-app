
export interface Visitor {
    id: number;

    name: string;
    email: string;
    phone: string;

    company: string;
    host: string;
    purpose: string;

    visitDate: string;

    status: 'PENDING' | 'APPROVED' | 'DENIED' | 'CHECKED_IN' | 'CHECKED_OUT';

    checkInTime?: string;
    checkOutTime?: string;
}
