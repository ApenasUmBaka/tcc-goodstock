// Classes
class MessageErrorController {
  /**
   * A method to set the message in the erro box.
   */
  public static setMessage(text: string) {
    const element = document.getElementById("error-message") as HTMLDivElement;
    element.innerHTML = text;

    if (!text.length) element.setAttribute("style", "display: none");
    else element.setAttribute("style", "");
  }
}
