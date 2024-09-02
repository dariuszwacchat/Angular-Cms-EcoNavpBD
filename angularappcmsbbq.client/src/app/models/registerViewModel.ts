
export interface RegisterViewModel {
    userId: string;

    email: string;
    password: any;

    imie: string;
    nazwisko: string;
    telefon: string;
    ulica: string;
    numerUlicy: string;
    miejscowosc: string;
    kraj: string;
    kodPocztowy: string;
    dataUrodzenia: string;

    roleName: string;

    token?: string;
    succes?: string;
    message?: string;
}
