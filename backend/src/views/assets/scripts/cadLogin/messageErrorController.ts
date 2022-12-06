// Classes
class MessageErrorController {
  /**
   * A method to set the message in the erro box.
   */
  public static setMessage(text: string) {
    const element = document.getElementById("error-message") as HTMLDivElement;
    element.innerText = text;
    if (!text) element.classList.add('hidden');
    else element.classList.remove('hidden');
  }
}
