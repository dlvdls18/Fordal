# Fordal
Fordal is a small and limited stack-based programming language named after Forda ferson.
Most of people doesn't understand "Forda ferson", it's basically a trend in Philippines.

Fordal is very limited.

# Features
|Feature|Support|
|:-----:|:-----:|
|Variable|✓|
|Exit|✓|
|Output|✓|
|Math|/|
|Input|×|
|Statements|×|
|Functions|×|
|Classes|×|
|Datatypes|×|
|Cycle|×|

|Symbol|Meaning|
|:----:|:-----:|
|✓|Supported|
|/|Partial support|
|×|Not supported|

# Installation
```html
<script src="https://cdn.jsdelivr.net/gh/dlvdls18/Fordal/fordal.js"></script>
```
```js
var fordal = Fordal(`

# Your fordal code here

`);
console.log(fordal);
console.log(fordal.logs.join("\n"));
```

# Documentation
## Syntax
```
Forda KEYWORD
  ARGUMENT-1
  ARGUMENT-2
  ARGUMENT-3
  ARGUMENT-N
ang ferson
```

### Forda
This will push itself to the stack.

### Argument
When stack is not empty,
Every next lines will be treated as arguments.
Each arguments will be added to the last stack.

### Ferson
This will execute and pop the last stack.
If nested, executed value will be treated as argument for the next last stack.

### Nesting
You can nest a `Ferson` by adding it to the argument.
For example:

```
Forda print
  Forda add
    10
    40
  ang ferson
ang ferson
# 50
```

## Keywords
### Math
#### Addition
```
# Argument size: >= 2
Forda add
  ...
ang ferson
```

#### Subtraction
```
# Argument size: >= 2
Forda subtract
  ...
ang ferson
```

#### Multiplication
```
# Argument size: >= 2
Forda multiply
  ...
ang ferson
```
#### Division
```
# Argument size: >= 2
Forda divide
  ...
ang ferson
```

### Variable
#### Set
```
# Argument size: = 2
Forda set
  NAME
  VALUE
ang ferson
```

#### Get
```
# Argument size: = 1
Forda get
  NAME
ang ferson
```

### Others
#### Print
```
# Argument size: >= 1
Forda print
  ...
ang ferson
```

#### Exit
```
# Argument size: = 1
Forda exit
  ...
ang ferson
```

#### Concat
```
# Argument size: >= 2
Forda concat
  ...
ang ferson
```

## Comments
```
# This is a comment
```
```
Forda add
  10
  # 60
  50
  # 100
  40
ang ferson
```

Do not add comment directly to the Forda, Argument, Ferson line.
```
# Yep
Forda add # Nope
  # Yep
  10 # Nope
  20
ang ferson # Nope
```

## Creating your own keywords
```js
Fordal(`

Forda print
  # > Hello <
  Forda MyKeyword
    Hello
  ang ferson
ang ferson

`, {
  MyKeyword: function(instance, args) {
    return "> " + args[0] + " <";
  }
});
```

