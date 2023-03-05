function Fordal(source, template, instance) {
  instance = instance || {
    stack: [],
    logs: [],
    variables: {},
    exit: null
  }
  var keywords = {
    print(instance, args) {
      if(args.length < 1) {
        instance.exit = "1";
        instance.logs.push("Forda error ang ferson: Mismatched argument size");
        return;
      }
      instance.logs = instance.logs.concat(args);
    },
    add(instance, args) {
      if(args.length < 2) {
        instance.exit = "1";
        instance.logs.push("Forda error ang ferson: Mismatched argument size");
        return;
      }
      var num = 0;
      args.forEach(function(item) {
        if(isNaN(parseInt(item))) {
          instance.exit = "1";
          instance.logs.push("Forda error ang ferson: Inconvertible value");
          return;
        }
        num += parseInt(item) == parseFloat(item) ? parseInt(item) : parseFloat(item);
      });
      return num.toString();
    },
    subtract(instance, args) {
      if(args.length < 2) {
        instance.exit = "1";
        instance.logs.push("Forda error ang ferson: Mismatched argument size");
        return;
      }
      var num = 0;
      args.forEach(function(item) {
        if(isNaN(parseInt(item))) {
          instance.exit = "1";
          instance.logs.push("Forda error ang ferson: Inconvertible value");
          return;
        }
        num -= parseInt(item) == parseFloat(item) ? parseInt(item) : parseFloat(item);
      });
      return num.toString();
    },
    multiply(instance, args) {
      if(args.length < 2) {
        instance.exit = "1";
        instance.logs.push("Forda error ang ferson: Mismatched argument size");
        return;
      }
      var num = 0;
      args.forEach(function(item) {
        if(isNaN(parseInt(item))) {
          instance.exit = "1";
          instance.logs.push("Forda error ang ferson: Inconvertible value");
          return;
        }
        num *= parseInt(item) == parseFloat(item) ? parseInt(item) : parseFloat(item);
      });
      return num.toString();
    },
    divide(instance, args) {
      if(args.length < 2) {
        instance.exit = "1";
        instance.logs.push("Forda error ang ferson: Mismatched argument size");
        return;
      }
      var num = 0;
      args.forEach(function(item) {
        if(isNaN(parseInt(item))) {
          instance.exit = "1";
          instance.logs.push("Forda error ang ferson: Inconvertible value");
          return;
        }
        num /= parseInt(item) == parseFloat(item) ? parseInt(item) : parseFloat(item);
      });
      return num.toString();
    },
    set(instance, args) {
      if(args.length != 2) {
        instance.exit = "1";
        instance.logs.push("Forda error ang ferson: Mismatched argument size");
        return;
      }
      instance.variables[args[0]] = args[1];
    },
    get(instance, args) {
      if(args.length < 1) {
        instance.exit = "1";
        instance.logs.push("Forda error ang ferson: Mismatched argument size");
        return;
      }
      if(instance.variables[args[0]] == null) {
        instance.exit = "1";
        instance.logs.push("Forda error ang ferson: Undefined variable");
        return;
      }
      return instance.variables[args[0]];
    },
    concat(instance, args) {
      if(args.length < 2) {
        instance.exit = "1";
        instance.logs.push("Forda error ang ferson: Mismatched argument size");
        return;
      }
      var res = "";
      args.forEach(function(item) {
        res += item;
      });
      return res;
    },
    exit(instance, args) {
      if(args.length != 1) {
        instance.exit = "1";
        instance.logs.push("Forda error ang ferson: Mismatched argument size");
        return;
      }
      instance.exit = args[0];
    }
  }
  if(typeof template == "object") for(var name in template) {
    keywords[name] = template[name];
  }
  function execute(stack) {
    if(instance.exit != null) return;
    if(keywords[stack.keyword] == null) {
      instance.exit = "1";
      instance.logs.push("Forda error ang ferson: unknown keyword");
      return;
    }
    return keywords[stack.keyword](instance, stack.args);
  }
  source.split("\n").forEach(function(line) {
    line = line.trim();
    if(line.length == 0 || line.startsWith("//")) return;
    if(line.startsWith("Forda")) {
      instance.stack.push({
        keyword: line.substr(6, line.length),
        args: []
      });
    } else if(line == "ang ferson") {
      var stack = instance.stack.pop();
      if(instance.stack.length > 0) {
        var last = instance.stack.pop();
        last.args.push(execute(stack));
        instance.stack.push(last);
      } else execute(stack);
    } else {
      if(instance.length == 0) {
        instance.exit = "1";
        instance.logs.push("Forda error ang ferson: Arguments can only be added when stack is not empty");
        return
      }
      var last = instance.stack.pop();
      last.args.push(line);
      instance.stack.push(last);
    }
  });
  if(instance.stack.length != 0) {
    instance.exit = "1";
    instance.logs.push("Forda error ang ferson: Stack is not completed");
  }
  return instance;
}
Fordal.version = 2;
