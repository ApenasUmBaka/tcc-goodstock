// Classes
class Validator {
  public static isNameValid(name: string): string | undefined {
    const regexName = /([^a-z])/i;
    if (!name) return 'O nome não foi específicado.';
    if (name.length < 3) return 'O nome deve ter pelo menos 3 caracteres.';
    if (regexName.exec(name)) return 'Insira um nome válido.';
    return;
  }

  public static isEmailValid(email: string): string | undefined {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/gi;
    if (!regexEmail.test(email)) return 'Por favor coloque um endereço de email válido.';
    return;
  }

  public static isPasswdValid(passwd: string): string | undefined {
    const regexPasswd = /([^0-9a-z\ !#-&(-.:-@[-_{-~])/;

    // Treat the passwd.
    if (!passwd) return 'Senha não específicada';
    if (!(passwd.length >= 8 && passwd.length <= 20)) {
      return 'A senha deve conter no minimo 8 digitos e máximo 20.';
    }

    if (regexPasswd.exec(passwd)) {
      return 'A senha deve conter apenas caracteres comuns, evite utilizar caracteres especiais como \' e ".';
    }

    return;
  }

  public static isOrgIdValid(orgId: string): string | undefined {
    if (!(Number(orgId) > 0)) {
      return 'Deve ser maior que 0 e se referir ao ID correspondente da sua organização.';
    }
    return;
  }
}
