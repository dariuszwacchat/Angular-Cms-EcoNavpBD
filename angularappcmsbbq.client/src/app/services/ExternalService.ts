
export class ExternalService {


  static takeText(text: string, length: number): string {
    if (text.length > length) {
      return text.substring(0, length);
    } else {
      return text;
    }
  }

}
