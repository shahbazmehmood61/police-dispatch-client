import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "formater",
})
export class FormaterPipe implements PipeTransform {
  transform(value: any): any {
    let cleaned = ("" + value).replace(/\D/g, "");
    let shorten = cleaned.slice(0, 10);
    //Check if the input is of correct length
    let match = shorten.match(/^(\d{3})(\d{3})(\d{4})$/);

    if (match) {
      return "(" + match[1] + ") " + match[2] + "-" + match[3];
    }

    return value;
  }
}
