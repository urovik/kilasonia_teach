import { ISection } from '../types';

export const sectionsData: ISection[] = [
  {
    id: 'C',
    title: 'язык C',
    icon: 'C',
    description: 'Полное руководство по языку Си',
    chapters: [
      {
        id: 'C-basics',
        title: 'Основы C',
        description: 'Изучи базовые концепции языка',
        lessons: [
          // ===== ТВОИ УРОКИ (оставлены как есть) =====
          {
            id: 'C-intro',
            title: 'Введение в C',
            description: 'Первое знакомство с языком C',
            content: [
              {
                type: 'text',
                content: 'C — это язык программирования, который предназначен для написания низкоуровневых вещей.'
              },
              {
                type: 'text',
                content: 'Он работает супер быстро за счет своей низкоуровневости.'
              },
              {
                type: 'text',
                content: 'Сегодня мы изучим основы: переменные, типы данных, функции.'
              },
              {
                type: 'heading',
                content: 'Первая программа на C'
              },
              {
                type: 'text',
                content: 'Давай напишем нашу первую программу на C:'
              },
              {
                type: 'code',
                content: {
                  title: 'Первая программа',
                  language: 'c',
                  code: `#include <stdio.h>\nint main(void){\n\tprintf("Hello, World!");\n}`
                }
              }
            ]
          },
          {
            id: 'C-program',
            title: 'Структура программы на C',
            description: 'Разбираем структуру программы на C',
            content: [
              {
                type: 'text',
                content: 'Любая программа написанная на языке C должна содержать точку входа в программу.'
              },
              {
                type: 'text',
                content: 'В C такой точкой является функция main(). По стандарту функция возвращает тип int. В теле функции используются фигурные скобки {}. В конце по стандарту хорошо бы писать return 0; что будет означать для компилятора, что программа завершилась корректно.'
              },
              {
                type: 'text',
                content: 'Стоит сказать о строчке #include <stdio.h> — это строка с подключением библиотеки stdio.h (standart input output), в которой лежит реализация функции printf().'
              },
              {
                type: 'heading',
                content: 'Минимальная программа на C'
              },
              {
                type: 'code',
                content: {
                  title: 'Минимальная программа',
                  language: 'c',
                  code: `#include <stdio.h>\nint main(void){\n\tprintf("Hello, World!");\n\treturn 0;\n}`
                }
              },
              {
                type: 'list',
                content: [
                  '#include <stdio.h> — подключение библиотеки для ввода-вывода',
                  'int main(void) — главная функция, точка входа',
                  '{ ... } — тело функции',
                  'printf("Hello, World!"); — вывод текста на экран',
                  'return 0; — сигнал об успешном завершении'
                ]
              }
            ]
          },
          {
            id: 'C-variables',
            title: 'Переменные и типы данных',
            description: 'Изучаем переменные в C',
            content: [
              {
                type: 'text',
                content: 'Начнем с того, что язык C строготипизирован. Перед тем как задать имя переменной, мы указываем тип, который она может в себе хранить.'
              },
              {
                type: 'heading',
                content: 'Объявление переменных'
              },
              {
                type: 'code',
                content: {
                  title: 'Объявление переменных',
                  language: 'c',
                  code: `#include <stdio.h>\nint main(void){\n\t// переменная с типом int\n\tint number = 0;\n}`
                }
              },
              {
                type: 'text',
                content: 'В C есть несколько основных типов данных:'
              },
              {
                type: 'list',
                content: [
                  'int — целые числа (например: 10, -5, 0)',
                  'float — числа с плавающей точкой (например: 3.14, -2.5)',
                  'char — символы (например: "A", "b", "5")',
                  'double — числа с двойной точностью'
                ]
              }
            ]
          },
          {
            id: 'C-types',
            title: 'Типы данных в C',
            description: 'Подробное описание всех типов данных',
            content: [
              {
                type: 'text',
                content: 'В языке C есть различные типы данных. Запоминать все не нужно, из основных сейчас это тип int, char, float.'
              },
              {
                type: 'heading',
                content: 'Целочисленные типы'
              },
              {
                type: 'list',
                content: [
                  'char — 1 байт, диапазон: -128 до 127 (signed) или 0 до 255 (unsigned)',
                  'short — 2 байта, диапазон: -32,768 до 32,767',
                  'int — 4 байта, диапазон: -2,147,483,648 до 2,147,483,647',
                  'long — 4 или 8 байт (зависит от платформы)',
                  'long long — 8 байт, диапазон: -9,223,372,036,854,775,807 до 9,223,372,036,854,775,807'
                ]
              },
              {
                type: 'heading',
                content: 'Вещественные типы'
              },
              {
                type: 'list',
                content: [
                  'float — 4 байта, точность: ~7 знаков',
                  'double — 8 байт, точность: ~15 знаков',
                  'long double — 10+ байт, точность: ~19 знаков'
                ]
              },
              {
                type: 'heading',
                content: 'Специальные типы'
              },
              {
                type: 'list',
                content: [
                  'void — обозначает отсутствие значения'
                ]
              },
              {
                type: 'text',
                content: 'Важно помнить, что размеры типов могут отличаться на разных платформах. Для проверки используй функцию sizeof():'
              },
              {
                type: 'code',
                content: {
                  title: 'Размеры типов данных',
                  language: 'c',
                  code: `#include <stdio.h>\n\nint main() {\n    printf("char: %zu байт\\n", sizeof(char));\n    printf("short: %zu байт\\n", sizeof(short));\n    printf("int: %zu байт\\n", sizeof(int));\n    printf("long: %zu байт\\n", sizeof(long));\n    printf("long long: %zu байт\\n", sizeof(long long));\n    printf("float: %zu байт\\n", sizeof(float));\n    printf("double: %zu байт\\n", sizeof(double));\n    return 0;\n}`
                }
              }
            ]
          },

          // ===== НОВЫЕ УРОКИ ПО C =====
          {
            id: 'C-operators',
            title: 'Операторы в C',
            description: 'Арифметические, логические и побитовые операторы',
            content: [
              {
                type: 'text',
                content: 'Операторы в C — это символы, которые выполняют операции над переменными и значениями. Рассмотрим основные группы операторов.'
              },
              {
                type: 'heading',
                content: 'Арифметические операторы'
              },
              {
                type: 'text',
                content: 'Используются для выполнения математических операций:'
              },
              {
                type: 'list',
                content: [
                  '+ — сложение (a + b)',
                  '- — вычитание (a - b)',
                  '* — умножение (a * b)',
                  '/ — деление (a / b)',
                  '% — остаток от деления (a % b)',
                  '++ — инкремент (a++ или ++a)',
                  '-- — декремент (a-- или --a)'
                ]
              },
              {
                type: 'code',
                content: {
                  title: 'Арифметические операции',
                  language: 'c',
                  code: `#include <stdio.h>\n\nint main() {\n    int a = 10, b = 3;\n    \n    printf("a + b = %d\\n", a + b);\n    printf("a - b = %d\\n", a - b);\n    printf("a * b = %d\\n", a * b);\n    printf("a / b = %d\\n", a / b);\n    printf("a %% b = %d\\n", a % b);\n    \n    // Инкремент и декремент\n    int c = 5;\n    printf("c = %d\\n", c++); // сначала использует, потом увеличивает\n    printf("c = %d\\n", ++c); // сначала увеличивает, потом использует\n    \n    return 0;\n}`
                }
              },
              {
                type: 'heading',
                content: 'Операторы сравнения'
              },
              {
                type: 'text',
                content: 'Используются для сравнения значений (результат — 1 (истина) или 0 (ложь)):'
              },
              {
                type: 'list',
                content: [
                  '== — равно (a == b)',
                  '!= — не равно (a != b)',
                  '> — больше (a > b)',
                  '< — меньше (a < b)',
                  '>= — больше или равно (a >= b)',
                  '<= — меньше или равно (a <= b)'
                ]
              },
              {
                type: 'code',
                content: {
                  title: 'Операторы сравнения',
                  language: 'c',
                  code: `#include <stdio.h>\n\nint main() {\n    int a = 5, b = 10;\n    \n    printf("a == b: %d\\n", a == b);\n    printf("a != b: %d\\n", a != b);\n    printf("a > b: %d\\n", a > b);\n    printf("a < b: %d\\n", a < b);\n    printf("a >= b: %d\\n", a >= b);\n    printf("a <= b: %d\\n", a <= b);\n    \n    return 0;\n}`
                }
              },
              {
                type: 'heading',
                content: 'Логические операторы'
              },
              {
                type: 'list',
                content: [
                  '&& — логическое И (true если оба true)',
                  '|| — логическое ИЛИ (true если хотя бы один true)',
                  '! — логическое НЕ (инвертирует значение)'
                ]
              },
              {
                type: 'code',
                content: {
                  title: 'Логические операторы',
                  language: 'c',
                  code: `#include <stdio.h>\n\nint main() {\n    int a = 1, b = 0;\n    \n    printf("a && b: %d\\n", a && b);\n    printf("a || b: %d\\n", a || b);\n    printf("!a: %d\\n", !a);\n    printf("!b: %d\\n", !b);\n    \n    // Практический пример\n    int age = 25;\n    int hasLicense = 1;\n    \n    if (age >= 18 && hasLicense) {\n        printf("Вы можете водить машину\\n");\n    }\n    \n    return 0;\n}`
                }
              }
            ]
          },
          {
            id: 'C-conditions',
            title: 'Условные операторы',
            description: 'if, else, else if, switch в C',
            content: [
              {
                type: 'text',
                content: 'Условные операторы позволяют выполнять разные блоки кода в зависимости от условий.'
              },
              {
                type: 'heading',
                content: 'Конструкция if-else'
              },
              {
                type: 'code',
                content: {
                  title: 'Базовый if-else',
                  language: 'c',
                  code: `#include <stdio.h>\n\nint main() {\n    int number = 10;\n    \n    if (number > 0) {\n        printf("Число положительное\\n");\n    } else if (number < 0) {\n        printf("Число отрицательное\\n");\n    } else {\n        printf("Число равно нулю\\n");\n    }\n    \n    return 0;\n}`
                }
              },
              {
                type: 'heading',
                content: 'Тернарный оператор'
              },
              {
                type: 'text',
                content: 'Сокращенная форма if-else: условие ? значение_если_истина : значение_если_ложь'
              },
              {
                type: 'code',
                content: {
                  title: 'Тернарный оператор',
                  language: 'c',
                  code: `#include <stdio.h>\n\nint main() {\n    int a = 10, b = 20;\n    int max = (a > b) ? a : b;\n    \n    printf("Максимальное число: %d\\n", max);\n    \n    // Вложенный тернарный оператор\n    int age = 18;\n    char* status = (age >= 18) ? "Взрослый" : "Несовершеннолетний";\n    printf("Статус: %s\\n", status);\n    \n    return 0;\n}`
                }
              },
              {
                type: 'heading',
                content: 'Конструкция switch'
              },
              {
                type: 'text',
                content: 'Используется для множественного выбора на основе значения выражения.'
              },
              {
                type: 'code',
                content: {
                  title: 'Switch case',
                  language: 'c',
                  code: `#include <stdio.h>\n\nint main() {\n    int day = 3;\n    \n    switch(day) {\n        case 1:\n            printf("Понедельник\\n");\n            break;\n        case 2:\n            printf("Вторник\\n");\n            break;\n        case 3:\n            printf("Среда\\n");\n            break;\n        case 4:\n            printf("Четверг\\n");\n            break;\n        case 5:\n            printf("Пятница\\n");\n            break;\n        default:\n            printf("Выходной\\n");\n            break;\n    }\n    \n    return 0;\n}`
                }
              }
            ]
          },
          {
            id: 'C-loops',
            title: 'Циклы в C',
            description: 'for, while, do-while, break, continue',
            content: [
              {
                type: 'text',
                content: 'Циклы позволяют выполнять блок кода многократно. В C есть три основных типа циклов.'
              },
              {
                type: 'heading',
                content: 'Цикл for'
              },
              {
                type: 'text',
                content: 'Используется когда известно количество итераций.'
              },
              {
                type: 'code',
                content: {
                  title: 'Цикл for',
                  language: 'c',
                  code: `#include <stdio.h>\n\nint main() {\n    // Вывод чисел от 1 до 10\n    for (int i = 1; i <= 10; i++) {\n        printf("%d ", i);\n    }\n    printf("\\n");\n    \n    // Сумма чисел от 1 до 100\n    int sum = 0;\n    for (int i = 1; i <= 100; i++) {\n        sum += i;\n    }\n    printf("Сумма 1..100 = %d\\n", sum);\n    \n    // Вложенные циклы\n    for (int i = 1; i <= 3; i++) {\n        for (int j = 1; j <= 3; j++) {\n            printf("%d*%d=%d\\t", i, j, i*j);\n        }\n        printf("\\n");\n    }\n    \n    return 0;\n}`
                }
              },
              {
                type: 'heading',
                content: 'Цикл while'
              },
              {
                type: 'text',
                content: 'Используется когда количество итераций неизвестно, условие проверяется в начале.'
              },
              {
                type: 'code',
                content: {
                  title: 'Цикл while',
                  language: 'c',
                  code: `#include <stdio.h>\n\nint main() {\n    int i = 1;\n    while (i <= 10) {\n        printf("%d ", i);\n        i++;\n    }\n    printf("\\n");\n    \n    // Сумма цифр числа\n    int num = 12345;\n    int sum = 0;\n    while (num > 0) {\n        sum += num % 10;\n        num /= 10;\n    }\n    printf("Сумма цифр = %d\\n", sum);\n    \n    return 0;\n}`
                }
              },
              {
                type: 'heading',
                content: 'Цикл do-while'
              },
              {
                type: 'text',
                content: 'Аналогичен while, но условие проверяется после выполнения. Гарантирует хотя бы одно выполнение.'
              },
              {
                type: 'code',
                content: {
                  title: 'Цикл do-while',
                  language: 'c',
                  code: `#include <stdio.h>\n\nint main() {\n    int i = 1;\n    do {\n        printf("%d ", i);\n        i++;\n    } while (i <= 10);\n    printf("\\n");\n    \n    // Пример: ввод чисел пока не введут 0\n    int num;\n    do {\n        printf("Введите число (0 для выхода): ");\n        scanf("%d", &num);\n        printf("Вы ввели: %d\\n", num);\n    } while (num != 0);\n    \n    return 0;\n}`
                }
              },
              {
                type: 'heading',
                content: 'Управление циклами: break и continue'
              },
              {
                type: 'list',
                content: [
                  'break — немедленный выход из цикла',
                  'continue — переход к следующей итерации'
                ]
              },
              {
                type: 'code',
                content: {
                  title: 'break и continue',
                  language: 'c',
                  code: `#include <stdio.h>\n\nint main() {\n    // break - выход из цикла\n    for (int i = 1; i <= 10; i++) {\n        if (i == 5) {\n            break; // выход при i == 5\n        }\n        printf("%d ", i);\n    }\n    printf("\\n");\n    \n    // continue - пропуск итерации\n    for (int i = 1; i <= 10; i++) {\n        if (i % 2 == 0) {\n            continue; // пропускаем четные числа\n        }\n        printf("%d ", i);\n    }\n    printf("\\n");\n    \n    return 0;\n}`
                }
              }
            ]
          },
          {
            id: 'C-arrays',
            title: 'Массивы в C',
            description: 'Одномерные и многомерные массивы',
            content: [
              {
                type: 'text',
                content: 'Массив — это структура данных, которая хранит набор элементов одного типа.'
              },
              {
                type: 'heading',
                content: 'Одномерные массивы'
              },
              {
                type: 'code',
                content: {
                  title: 'Работа с одномерным массивом',
                  language: 'c',
                  code: `#include <stdio.h>\n\nint main() {\n    // Объявление и инициализация\n    int numbers[5] = {10, 20, 30, 40, 50};\n    \n    // Доступ к элементам\n    printf("Первый элемент: %d\\n", numbers[0]);\n    printf("Третий элемент: %d\\n", numbers[2]);\n    \n    // Изменение элемента\n    numbers[1] = 100;\n    \n    // Вывод всех элементов\n    printf("Все элементы: ");\n    for (int i = 0; i < 5; i++) {\n        printf("%d ", numbers[i]);\n    }\n    printf("\\n");\n    \n    // Поиск максимального элемента\n    int max = numbers[0];\n    for (int i = 1; i < 5; i++) {\n        if (numbers[i] > max) {\n            max = numbers[i];\n        }\n    }\n    printf("Максимальный элемент: %d\\n", max);\n    \n    return 0;\n}`
                }
              },
              {
                type: 'heading',
                content: 'Многомерные массивы (матрицы)'
              },
              {
                type: 'code',
                content: {
                  title: 'Матрица 3x3',
                  language: 'c',
                  code: `#include <stdio.h>\n\nint main() {\n    // Объявление матрицы 3x3\n    int matrix[3][3] = {\n        {1, 2, 3},\n        {4, 5, 6},\n        {7, 8, 9}\n    };\n    \n    // Вывод матрицы\n    for (int i = 0; i < 3; i++) {\n        for (int j = 0; j < 3; j++) {\n            printf("%d ", matrix[i][j]);\n        }\n        printf("\\n");\n    }\n    \n    // Сумма элементов\n    int sum = 0;\n    for (int i = 0; i < 3; i++) {\n        for (int j = 0; j < 3; j++) {\n            sum += matrix[i][j];\n        }\n    }\n    printf("Сумма элементов: %d\\n", sum);\n    \n    return 0;\n}`
                }
              },
              {
                type: 'heading',
                content: 'Строки (массивы символов)'
              },
              {
                type: 'code',
                content: {
                  title: 'Работа со строками',
                  language: 'c',
                  code: `#include <stdio.h>\n#include <string.h>\n\nint main() {\n    // Строка как массив символов\n    char name[] = "Alice";\n    \n    printf("Имя: %s\\n", name);\n    printf("Длина: %lu\\n", strlen(name));\n    \n    // Изменение строки\n    name[0] = 'B';\n    printf("Новое имя: %s\\n", name);\n    \n    // Ввод строки\n    char city[50];\n    printf("Введите город: ");\n    scanf("%s", city);\n    printf("Ваш город: %s\\n", city);\n    \n    return 0;\n}`
                }
              }
            ]
          },
          {
            id: 'C-functions',
            title: 'Функции в C',
            description: 'Определение, параметры, возврат значений',
            content: [
              {
                type: 'text',
                content: 'Функции — это блоки кода, которые можно вызывать многократно. Они помогают организовать код и избежать повторений.'
              },
              {
                type: 'heading',
                content: 'Определение функции'
              },
              {
                type: 'code',
                content: {
                  title: 'Функции в C',
                  language: 'c',
                  code: `#include <stdio.h>\n\n// Функция без параметров\nvoid greet() {\n    printf("Привет!\\n");\n}\n\n// Функция с параметрами\nint add(int a, int b) {\n    return a + b;\n}\n\n// Функция с параметрами и без возврата\nvoid printSum(int a, int b) {\n    printf("%d + %d = %d\\n", a, b, a + b);\n}\n\n// Функция для вычисления факториала\nint factorial(int n) {\n    int result = 1;\n    for (int i = 1; i <= n; i++) {\n        result *= i;\n    }\n    return result;\n}\n\nint main() {\n    greet();\n    \n    int x = 5, y = 3;\n    printf("Сумма: %d\\n", add(x, y));\n    printSum(x, y);\n    \n    int num = 5;\n    printf("Факториал %d = %d\\n", num, factorial(num));\n    \n    return 0;\n}`
                }
              },
              {
                type: 'heading',
                content: 'Прототипы функций'
              },
              {
                type: 'text',
                content: 'Прототип объявляет функцию до ее использования, позволяя вызывать ее до определения.'
              },
              {
                type: 'code',
                content: {
                  title: 'Прототипы функций',
                  language: 'c',
                  code: `#include <stdio.h>\n\n// Прототипы функций\nint multiply(int a, int b);\nvoid printInfo();\n\nint main() {\n    // Можно вызывать до определения\n    printf("5 * 3 = %d\\n", multiply(5, 3));\n    printInfo();\n    \n    return 0;\n}\n\n// Определение функций\nint multiply(int a, int b) {\n    return a * b;\n}\n\nvoid printInfo() {\n    printf("Это функция с прототипом\\n");\n}`
                }
              },
              {
                type: 'heading',
                content: 'Рекурсивные функции'
              },
              {
                type: 'text',
                content: 'Функция, которая вызывает сама себя.'
              },
              {
                type: 'code',
                content: {
                  title: 'Рекурсия',
                  language: 'c',
                  code: `#include <stdio.h>\n\n// Рекурсивный подсчет суммы чисел от 1 до n\nint sumRecursive(int n) {\n    if (n == 0) {\n        return 0;\n    }\n    return n + sumRecursive(n - 1);\n}\n\n// Рекурсивное вычисление факториала\nint factorialRecursive(int n) {\n    if (n <= 1) {\n        return 1;\n    }\n    return n * factorialRecursive(n - 1);\n}\n\n// Рекурсивный обход массива\nvoid printArray(int arr[], int size, int index) {\n    if (index == size) {\n        return;\n    }\n    printf("%d ", arr[index]);\n    printArray(arr, size, index + 1);\n}\n\nint main() {\n    printf("Сумма 1..5 = %d\\n", sumRecursive(5));\n    printf("Факториал 5 = %d\\n", factorialRecursive(5));\n    \n    int numbers[] = {1, 2, 3, 4, 5};\n    printf("Массив: ");\n    printArray(numbers, 5, 0);\n    printf("\\n");\n    \n    return 0;\n}`
                }
              }
            ]
          },
          {
            id: 'C-pointers',
            title: 'Указатели в C',
            description: 'Работа с указателями и адресами памяти',
            content: [
              {
                type: 'text',
                content: 'Указатели — это переменные, которые хранят адреса в памяти. Они дают прямой доступ к памяти и являются одной из самых мощных возможностей C.'
              },
              {
                type: 'heading',
                content: 'Базовые понятия указателей'
              },
              {
                type: 'list',
                content: [
                  '& — оператор взятия адреса',
                  '* — оператор разыменования (получение значения по адресу)',
                  'NULL — нулевой указатель (указывает на ничего)'
                ]
              },
              {
                type: 'code',
                content: {
                  title: 'Основы указателей',
                  language: 'c',
                  code: `#include <stdio.h>\n\nint main() {\n    int number = 42;\n    int *ptr = &number; // указатель на number\n    \n    printf("Значение: %d\\n", number);\n    printf("Адрес переменной: %p\\n", &number);\n    printf("Указатель хранит адрес: %p\\n", ptr);\n    printf("Значение по указателю: %d\\n", *ptr);\n    \n    // Изменение через указатель\n    *ptr = 100;\n    printf("Новое значение: %d\\n", number);\n    \n    return 0;\n}`
                }
              },
              {
                type: 'heading',
                content: 'Указатели и массивы'
              },
              {
                type: 'code',
                content: {
                  title: 'Указатели и массивы',
                  language: 'c',
                  code: `#include <stdio.h>\n\nint main() {\n    int arr[] = {10, 20, 30, 40, 50};\n    int *ptr = arr; // Указатель на первый элемент\n    \n    printf("Первый элемент: %d\\n", *ptr);\n    printf("Второй элемент: %d\\n", *(ptr + 1));\n    \n    // Проход по массиву через указатель\n    for (int i = 0; i < 5; i++) {\n        printf("arr[%d] = %d\\n", i, *(ptr + i));\n    }\n    \n    // Меняем элементы через указатель\n    for (int i = 0; i < 5; i++) {\n        *(ptr + i) *= 2;\n    }\n    \n    printf("После умножения: ");\n    for (int i = 0; i < 5; i++) {\n        printf("%d ", arr[i]);\n    }\n    printf("\\n");\n    \n    return 0;\n}`
                }
              },
              {
                type: 'heading',
                content: 'Передача параметров по ссылке'
              },
              {
                type: 'text',
                content: 'Используя указатели, можно изменять переменные внутри функций.'
              },
              {
                type: 'code',
                content: {
                  title: 'Передача по ссылке',
                  language: 'c',
                  code: `#include <stdio.h>\n\n// Функция, которая меняет значения\nvoid swap(int *a, int *b) {\n    int temp = *a;\n    *a = *b;\n    *b = temp;\n}\n\n// Функция, которая увеличивает значение на 10\nvoid increment(int *value) {\n    *value += 10;\n}\n\nint main() {\n    int x = 5, y = 10;\n    printf("До swap: x=%d, y=%d\\n", x, y);\n    swap(&x, &y);\n    printf("После swap: x=%d, y=%d\\n", x, y);\n    \n    int num = 7;\n    printf("До increment: %d\\n", num);\n    increment(&num);\n    printf("После increment: %d\\n", num);\n    \n    return 0;\n}`
                }
              }
            ]
          },
          {
            id: 'C-structs',
            title: 'Структуры в C',
            description: 'Создание пользовательских типов данных',
            content: [
              {
                type: 'text',
                content: 'Структуры позволяют объединять данные разных типов в один составной тип.'
              },
              {
                type: 'heading',
                content: 'Определение и использование структур'
              },
              {
                type: 'code',
                content: {
                  title: 'Структуры в C',
                  language: 'c',
                  code: `#include <stdio.h>\n#include <string.h>\n\n// Определение структуры\nstruct Student {\n    char name[50];\n    int age;\n    float gpa;\n};\n\nint main() {\n    // Объявление и инициализация\n    struct Student student1 = {"Alice", 20, 3.8};\n    struct Student student2;\n    \n    // Доступ к полям\n    printf("Студент: %s, возраст: %d, GPA: %.2f\\n", \n           student1.name, student1.age, student1.gpa);\n    \n    // Заполнение структуры\n    strcpy(student2.name, "Bob");\n    student2.age = 22;\n    student2.gpa = 3.5;\n    \n    printf("Студент: %s, возраст: %d, GPA: %.2f\\n", \n           student2.name, student2.age, student2.gpa);\n    \n    return 0;\n}`
                }
              },
              {
                type: 'heading',
                content: 'Массивы структур'
              },
              {
                type: 'code',
                content: {
                  title: 'Массив структур',
                  language: 'c',
                  code: `#include <stdio.h>\n\nstruct Point {\n    int x;\n    int y;\n};\n\nint main() {\n    // Массив структур\n    struct Point points[3] = {\n        {1, 2},\n        {3, 4},\n        {5, 6}\n    };\n    \n    for (int i = 0; i < 3; i++) {\n        printf("Point %d: (%d, %d)\\n", i, points[i].x, points[i].y);\n    }\n    \n    // Изменение через указатель\n    struct Point *ptr = &points[0];\n    ptr->x = 10;  // то же что (*ptr).x = 10\n    ptr->y = 20;\n    printf("Измененная точка: (%d, %d)\\n", points[0].x, points[0].y);\n    \n    return 0;\n}`
                }
              },
              {
                type: 'heading',
                content: 'Вложенные структуры'
              },
              {
                type: 'code',
                content: {
                  title: 'Вложенные структуры',
                  language: 'c',
                  code: `#include <stdio.h>\n\nstruct Date {\n    int day;\n    int month;\n    int year;\n};\n\nstruct Person {\n    char name[50];\n    struct Date birthDate;\n    float height;\n};\n\nint main() {\n    struct Person person = {\n        "John",\n        {15, 5, 1990},\n        1.75\n    };\n    \n    printf("Имя: %s\\n", person.name);\n    printf("Дата рождения: %02d.%02d.%04d\\n", \n           person.birthDate.day, \n           person.birthDate.month, \n           person.birthDate.year);\n    printf("Рост: %.2f м\\n", person.height);\n    \n    return 0;\n}`
                }
              }
            ]
          }
        ]
      },
      {
        id: 'C-advanced',
        title: 'Продвинутое руководство по языку C',
        description: 'Глубокое погружение в возможности языка',
        lessons: [
          // ===== ТВОЙ УРОК (оставлен как есть) =====
          {
            id: 'C-memory',
            title: 'Работа с памятью',
            description: 'Управление памятью в C',
            content: [
              {
                type: 'text',
                content: 'В языке C можно управлять памятью. Это очень важно понимать, потому что в C нет сборщика мусора — всю выделенную память нужно обрабатывать самому.'
              },
              {
                type: 'text',
                content: 'Важно понимать, что в C без выделения памяти и указателей никуда — иначе это был бы не C.'
              },
              {
                type: 'heading',
                content: 'Функции для работы с памятью'
              },
              {
                type: 'text',
                content: 'Есть 4 основные функции для работы с памятью, которые находятся в стандартной библиотеке <stdlib.h>:'
              },
              {
                type: 'list',
                content: [
                  'malloc(size_t size) — принимает размер типа данных, возвращает указатель в памяти на него',
                  'calloc(size_t nmemb, size_t size) — принимает количество элементов и размер типа данных, возвращает указатель на тип данных с тем количеством элементов, которые мы указали. Инициализирует элементы нулями.',
                  'realloc(void *ptr, size_t size) — принимает старый указатель и размер типа данных. Используется чтобы перевыделить память.',
                  'free(void *ptr) — освобождает выделенную память, помечает ее неиспользуемой.'
                ]
              },
              {
                type: 'heading',
                content: 'Пример использования'
              },
              {
                type: 'code',
                content: {
                  title: 'Динамическое выделение памяти',
                  language: 'c',
                  code: `#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    // Выделяем память для 5 целых чисел\n    int *arr = (int*)malloc(5 * sizeof(int));\n    \n    if (arr == NULL) {\n        printf("Ошибка выделения памяти!\\n");\n        return 1;\n    }\n    \n    // Заполняем массив\n    for (int i = 0; i < 5; i++) {\n        arr[i] = i * 10;\n    }\n    \n    // Выводим\n    for (int i = 0; i < 5; i++) {\n        printf("arr[%d] = %d\\n", i, arr[i]);\n    }\n    \n    // Освобождаем память\n    free(arr);\n    \n    return 0;\n}`
                }
              },
              {
                type: 'text',
                content: 'Важно: всегда освобождай память, которую выделил, чтобы избежать утечек!'
              }
            ]
          },
          
          // ===== НОВЫЕ ПРОДВИНУТЫЕ УРОКИ =====
          {
            id: 'C-file-io',
            title: 'Работа с файлами в C',
            description: 'Чтение, запись и обработка файлов',
            content: [
              {
                type: 'text',
                content: 'Работа с файлами — важная часть программирования на C. Библиотека stdio.h предоставляет функции для работы с файлами.'
              },
              {
                type: 'heading',
                content: 'Основные функции для работы с файлами'
              },
              {
                type: 'list',
                content: [
                  'fopen() — открытие файла',
                  'fclose() — закрытие файла',
                  'fprintf() — запись форматированного текста',
                  'fscanf() — чтение форматированного текста',
                  'fgets() — чтение строки',
                  'fputs() — запись строки',
                  'fread() — чтение бинарных данных',
                  'fwrite() — запись бинарных данных'
                ]
              },
              {
                type: 'heading',
                content: 'Режимы открытия файлов'
              },
              {
                type: 'list',
                content: [
                  '"r" — чтение (файл должен существовать)',
                  '"w" — запись (создает новый файл или перезаписывает)',
                  '"a" — добавление (создает новый файл или дописывает в конец)',
                  '"r+" — чтение и запись',
                  '"w+" — чтение и запись (перезаписывает файл)',
                  '"a+" — чтение и запись (добавление в конец)'
                ]
              },
              {
                type: 'code',
                content: {
                  title: 'Чтение и запись текстового файла',
                  language: 'c',
                  code: `#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n\nint main() {\n    FILE *file;\n    char buffer[100];\n    \n    // === ЗАПИСЬ В ФАЙЛ ===\n    file = fopen("test.txt", "w");\n    if (file == NULL) {\n        printf("Ошибка открытия файла\\n");\n        return 1;\n    }\n    \n    fprintf(file, "Привет, мир!\\n");\n    fprintf(file, "Число: %d\\n", 42);\n    fclose(file);\n    \n    printf("✅ Запись выполнена\\n");\n    \n    // === ЧТЕНИЕ ИЗ ФАЙЛА ===\n    file = fopen("test.txt", "r");\n    if (file == NULL) {\n        printf("Ошибка открытия файла\\n");\n        return 1;\n    }\n    \n    printf("\\n📖 Содержимое файла:\\n");\n    while (fgets(buffer, sizeof(buffer), file) != NULL) {\n        printf("%s", buffer);\n    }\n    fclose(file);\n    \n    return 0;\n}`
                }
              },
              {
                type: 'heading',
                content: 'Запись массива структур в файл'
              },
              {
                type: 'code',
                content: {
                  title: 'Сохранение структур в файл',
                  language: 'c',
                  code: `#include <stdio.h>\n#include <stdlib.h>\n\ntypedef struct {\n    char name[50];\n    int age;\n    float gpa;\n} Student;\n\nint main() {\n    Student students[3] = {\n        {"Alice", 20, 3.8},\n        {"Bob", 22, 3.5},\n        {"Charlie", 21, 3.9}\n    };\n    \n    // Сохраняем в файл\n    FILE *file = fopen("students.bin", "wb");\n    if (file == NULL) {\n        printf("Ошибка открытия файла\\n");\n        return 1;\n    }\n    \n    fwrite(students, sizeof(Student), 3, file);\n    fclose(file);\n    \n    printf("✅ Студенты сохранены\\n");\n    \n    // Читаем из файла\n    Student loaded[3];\n    file = fopen("students.bin", "rb");\n    if (file == NULL) {\n        printf("Ошибка открытия файла\\n");\n        return 1;\n    }\n    \n    fread(loaded, sizeof(Student), 3, file);\n    fclose(file);\n    \n    printf("\\n📖 Загруженные студенты:\\n");\n    for (int i = 0; i < 3; i++) {\n        printf("Имя: %s, Возраст: %d, GPA: %.2f\\n", \n               loaded[i].name, loaded[i].age, loaded[i].gpa);\n    }\n    \n    return 0;\n}`
                }
              }
            ]
          },
          {
            id: 'C-preprocessor',
            title: 'Препроцессор C',
            description: 'Директивы препроцессора: #define, #include, #ifdef и другие',
            content: [
              {
                type: 'text',
                content: 'Препроцессор обрабатывает код перед компиляцией. Директивы начинаются с символа #.'
              },
              {
                type: 'heading',
                content: 'Основные директивы препроцессора'
              },
              {
                type: 'list',
                content: [
                  '#include — подключение файлов',
                  '#define — определение макросов',
                  '#undef — отмена определения макроса',
                  '#ifdef — проверка, определен ли макрос',
                  '#ifndef — проверка, не определен ли макрос',
                  '#endif — завершение условной директивы',
                  '#if — условная компиляция',
                  '#else — иначе в условной компиляции',
                  '#elif — else-if в условной компиляции'
                ]
              },
              {
                type: 'code',
                content: {
                  title: 'Использование препроцессора',
                  language: 'c',
                  code: `#include <stdio.h>\n\n// Константа\n#define PI 3.14159\n\n// Макрос для вычисления площади круга\n#define CIRCLE_AREA(r) (PI * (r) * (r))\n\n// Макрос для нахождения максимума\n#define MAX(a, b) ((a) > (b) ? (a) : (b))\n\n// Условная компиляция\n#define DEBUG 1\n\nint main() {\n    // Использование константы\n    printf("PI = %.5f\\n", PI);\n    \n    // Использование макроса\n    double radius = 5.0;\n    printf("Площадь круга: %.2f\\n", CIRCLE_AREA(radius));\n    \n    // Использование макроса с несколькими параметрами\n    int a = 10, b = 20;\n    printf("Максимум: %d\\n", MAX(a, b));\n    \n    // Условная компиляция\n    #ifdef DEBUG\n        printf("🔍 Режим отладки включен\\n");\n    #endif\n    \n    #ifndef RELEASE\n        printf("⚠️ Версия не для релиза\\n");\n    #endif\n    \n    // Предопределенные макросы\n    printf("\\n📋 Информация о файле:\\n");\n    printf("Файл: %s\\n", __FILE__);\n    printf("Строка: %d\\n", __LINE__);\n    printf("Дата: %s\\n", __DATE__);\n    printf("Время: %s\\n", __TIME__);\n    \n    return 0;\n}`
                }
              },
              {
                type: 'heading',
                content: 'Защита от повторного включения'
              },
              {
                type: 'text',
                content: 'Используется в заголовочных файлах, чтобы предотвратить множественное включение.'
              },
              {
                type: 'code',
                content: {
                  title: 'Пример заголовочного файла',
                  language: 'c',
                  code: `// example.h\n#ifndef EXAMPLE_H\n#define EXAMPLE_H\n\n#define VERSION "1.0.0"\n\nint add(int a, int b);\n\n#endif // EXAMPLE_H`
                }
              }
            ]
          },
          {
            id: 'C-dynamic-memory',
            title: 'Динамическое выделение памяти',
            description: 'malloc, calloc, realloc, free в деталях',
            content: [
              {
                type: 'text',
                content: 'Динамическое выделение памяти позволяет создавать структуры данных, размер которых неизвестен на этапе компиляции.'
              },
              {
                type: 'heading',
                content: 'Сравнение malloc, calloc, realloc'
              },
              {
                type: 'list',
                content: [
                  'malloc — выделяет неинициализированную память',
                  'calloc — выделяет и обнуляет память',
                  'realloc — изменяет размер выделенной памяти',
                  'free — освобождает память'
                ]
              },
              {
                type: 'code',
                content: {
                  title: 'Подробный пример динамической памяти',
                  language: 'c',
                  code: `#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n\nint main() {\n    // === malloc - выделение памяти ===\n    int *arr1 = (int*)malloc(5 * sizeof(int));\n    if (arr1 == NULL) {\n        printf("Ошибка выделения памяти\\n");\n        return 1;\n    }\n    \n    // В памяти мусорные значения\n    printf("arr1 (не инициализирован): %d\\n", arr1[0]);\n    \n    // === calloc - выделение + обнуление ===\n    int *arr2 = (int*)calloc(5, sizeof(int));\n    if (arr2 == NULL) {\n        printf("Ошибка выделения памяти\\n");\n        return 1;\n    }\n    \n    // Все элементы равны 0\n    printf("arr2 (инициализирован нулями): %d\\n", arr2[0]);\n    \n    // === Заполнение данных ===\n    for (int i = 0; i < 5; i++) {\n        arr2[i] = (i + 1) * 10;\n    }\n    \n    printf("arr2 после заполнения: ");\n    for (int i = 0; i < 5; i++) {\n        printf("%d ", arr2[i]);\n    }\n    printf("\\n");\n    \n    // === realloc - изменение размера ===\n    int *arr3 = (int*)realloc(arr2, 10 * sizeof(int));\n    if (arr3 == NULL) {\n        printf("Ошибка перевыделения памяти\\n");\n        free(arr2);\n        return 1;\n    }\n    \n    // Старые данные сохранились\n    printf("arr3 после realloc (старые данные): ");\n    for (int i = 0; i < 5; i++) {\n        printf("%d ", arr3[i]);\n    }\n    printf("\\n");\n    \n    // Заполняем новые элементы\n    for (int i = 5; i < 10; i++) {\n        arr3[i] = (i + 1) * 10;\n    }\n    \n    printf("arr3 полный: ");\n    for (int i = 0; i < 10; i++) {\n        printf("%d ", arr3[i]);\n    }\n    printf("\\n");\n    \n    // === Освобождение памяти ===\n    free(arr1);\n    free(arr3);\n    \n    return 0;\n}`
                }
              },
              {
                type: 'heading',
                content: 'Типичные ошибки при работе с памятью'
              },
              {
                type: 'list',
                content: [
                  'Утечка памяти — забыли вызвать free()',
                  'Двойное освобождение — вызвали free() дважды',
                  'Использование после освобождения — обращение к freed памяти',
                  'Выход за границы — запись за пределами выделенной памяти',
                  'Не проверка возврата malloc — использование NULL указателя'
                ]
              },
              {
                type: 'code',
                content: {
                  title: 'Пример безопасной работы с памятью',
                  language: 'c',
                  code: `#include <stdio.h>\n#include <stdlib.h>\n\n// Создание безопасного динамического массива\nint* createArray(int size) {\n    if (size <= 0) {\n        return NULL;\n    }\n    \n    int *arr = (int*)calloc(size, sizeof(int));\n    if (arr == NULL) {\n        printf("❌ Ошибка: не удалось выделить память\\n");\n        return NULL;\n    }\n    \n    return arr;\n}\n\n// Безопасное освобождение\nvoid safeFree(void **ptr) {\n    if (ptr != NULL && *ptr != NULL) {\n        free(*ptr);\n        *ptr = NULL; // Предотвращает двойное освобождение\n    }\n}\n\nint main() {\n    int *array = createArray(5);\n    \n    if (array == NULL) {\n        return 1;\n    }\n    \n    // Используем массив\n    for (int i = 0; i < 5; i++) {\n        array[i] = i * 100;\n        printf("array[%d] = %d\\n", i, array[i]);\n    }\n    \n    // Безопасно освобождаем\n    safeFree((void**)&array);\n    \n    // Проверяем, что память освобождена\n    if (array == NULL) {\n        printf("✅ Память успешно освобождена\\n");\n    }\n    \n    return 0;\n}`
                }
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'Python',
    title: 'Python',
    icon: '🐍',
    description: 'Освой Python — язык для AI, data science и веба',
    chapters: [
      {
        id: 'python-basics',
        title: 'Основы Python',
        description: 'Первые шаги в Python',
        lessons: [
          {
            id: 'python-intro',
            title: 'Введение в Python',
            description: 'Что такое Python и почему он популярен',
            content: [
              {
                type: 'text',
                content: 'Python — это высокоуровневый язык программирования, созданный Гвидо ван Россумом в 1991 году. Его главная философия — читаемость кода и простота.'
              },
              {
                type: 'text',
                content: 'Python широко используется в веб-разработке, анализе данных, искусственном интеллекте, автоматизации и научных вычислениях.'
              },
              {
                type: 'heading',
                content: 'Первая программа'
              },
              {
                type: 'code',
                content: {
                  title: 'Hello, World!',
                  language: 'python',
                  code: 'print("Hello, World!")'
                }
              },
              {
                type: 'text',
                content: 'В Python нет точек с запятой и фигурных скобок. Блоки кода выделяются отступами (обычно 4 пробела).'
              }
            ]
          },
          {
            id: 'python-variables',
            title: 'Переменные и типы данных',
            description: 'Как хранить данные',
            content: [
              {
                type: 'text',
                content: 'В Python не нужно объявлять тип переменной — интерпретатор определяет его автоматически.'
              },
              {
                type: 'code',
                content: {
                  title: 'Переменные',
                  language: 'python',
                  code: `name = "Alice"      # строка\nage = 25            # целое число\nprice = 19.99       # число с плавающей точкой\nis_active = True    # булево значение (True/False)`
                }
              },
              {
                type: 'heading',
                content: 'Основные типы данных'
              },
              {
                type: 'list',
                content: [
                  'int — целые числа (10, -5, 0)',
                  'float — числа с плавающей точкой (3.14, -2.5)',
                  'str — строки ("Hello", "Python")',
                  'bool — True или False',
                  'list — списки ([1, 2, 3])',
                  'dict — словари ({"name": "Alice"})'
                ]
              },
              {
                type: 'code',
                content: {
                  title: 'Проверка типа',
                  language: 'python',
                  code: `name = "Alice"\nprint(type(name))  # <class 'str'>\n\nage = 25\nprint(type(age))   # <class 'int'>`
                }
              }
            ]
          },
          {
            id: 'python-functions',
            title: 'Функции',
            description: 'Создаём свои функции',
            content: [
              {
                type: 'text',
                content: 'Функции — это блоки кода, которые можно вызывать многократно. Они помогают организовать код и избежать повторений.'
              },
              {
                type: 'code',
                content: {
                  title: 'Функции',
                  language: 'python',
                  code: `def greet(name):\n    return f"Привет, {name}!"\n\nprint(greet("Alice"))  # Привет, Alice!\n\n# Функция без return\ndef say_hello():\n    print("Hello!")\n\nsay_hello()`
                }
              }
            ]
          },
          {
            id: 'python-conditions',
            title: 'Условные операторы',
            description: 'if, elif, else',
            content: [
              {
                type: 'text',
                content: 'Условные операторы позволяют выполнять разные блоки кода в зависимости от условий.'
              },
              {
                type: 'code',
                content: {
                  title: 'Условия',
                  language: 'python',
                  code: `age = 18\n\nif age >= 18:\n    print("Ты совершеннолетний")\nelif age > 0:\n    print("Ты ребенок")\nelse:\n    print("Неверный возраст")\n\n# Тернарный оператор\nresult = "Взрослый" if age >= 18 else "Ребенок"`
                }
              }
            ]
          },
          {
            id: 'python-loops',
            title: 'Циклы',
            description: 'for и while',
            content: [
              {
                type: 'text',
                content: 'Циклы позволяют выполнять код многократно. В Python есть два основных типа циклов: for и while.'
              },
              {
                type: 'code',
                content: {
                  title: 'Циклы',
                  language: 'python',
                  code: `# Цикл for по списку\nfruits = ["яблоко", "банан", "апельсин"]\nfor fruit in fruits:\n    print(fruit)\n\n# Цикл с range\nfor i in range(5):\n    print(i)  # 0, 1, 2, 3, 4\n\n# Цикл while\ncount = 0\nwhile count < 5:\n    print(count)\n    count += 1`
                }
              }
            ]
          },
          {
            id: 'python-lists',
            title: 'Списки',
            description: 'Одна из важнейших структур',
            content: [
              {
                type: 'text',
                content: 'Списки — это упорядоченные изменяемые коллекции элементов. Они могут содержать элементы разных типов.'
              },
              {
                type: 'code',
                content: {
                  title: 'Работа со списками',
                  language: 'python',
                  code: `numbers = [1, 2, 3, 4, 5]\n\n# Доступ к элементам\nprint(numbers[0])   # 1\nprint(numbers[-1])  # 5\nprint(numbers[1:3]) # [2, 3]\n\n# Добавление\nnumbers.append(6)          # [1,2,3,4,5,6]\nnumbers.insert(0, 0)       # [0,1,2,3,4,5,6]\n\n# Удаление\nnumbers.remove(3)          # [0,1,2,4,5,6]\nlast = numbers.pop()       # удаляет и возвращает последний\n\n# Перебор\nfor num in numbers:\n    print(num)`
                }
              }
            ]
          },
          {
            id: 'python-dicts',
            title: 'Словари',
            description: 'Хранение данных по ключам',
            content: [
              {
                type: 'text',
                content: 'Словари хранят пары "ключ-значение". Это как телефонная книга, где по имени можно найти номер.'
              },
              {
                type: 'code',
                content: {
                  title: 'Словари',
                  language: 'python',
                  code: `person = {\n    "name": "Alice",\n    "age": 25,\n    "city": "Moscow",\n    "hobbies": ["reading", "coding"]\n}\n\n# Доступ по ключу\nprint(person["name"])      # Alice\nprint(person.get("job", "Не указано"))  # Не указано\n\n# Добавление/изменение\nperson["job"] = "Developer"\n\n# Перебор\nfor key, value in person.items():\n    print(f"{key}: {value}")`
                }
              }
            ]
          }
        ]
      },
      {
        id: 'python-advanced',
        title: 'Продвинутый Python',
        description: 'Идём дальше после основ',
        lessons: [
          {
            id: 'python-files',
            title: 'Работа с файлами',
            description: 'Чтение и запись файлов',
            content: [
              {
                type: 'text',
                content: 'Python предоставляет простые инструменты для работы с файлами. Контекстный менеджер `with` автоматически закрывает файл.'
              },
              {
                type: 'code',
                content: {
                  title: 'Файлы',
                  language: 'python',
                  code: `# Запись в файл\nwith open("file.txt", "w", encoding="utf-8") as f:\n    f.write("Привет, мир!\\n")\n    f.write("Вторая строка")\n\n# Чтение файла\nwith open("file.txt", "r", encoding="utf-8") as f:\n    content = f.read()\n    print(content)\n\n# Построчное чтение\nwith open("file.txt", "r", encoding="utf-8") as f:\n    for line in f:\n        print(line.strip())`
                }
              }
            ]
          },
          {
            id: 'python-oop',
            title: 'ООП в Python',
            description: 'Классы и объекты',
            content: [
              {
                type: 'text',
                content: 'Python поддерживает объектно-ориентированное программирование. Классы — это шаблоны для создания объектов.'
              },
              {
                type: 'code',
                content: {
                  title: 'Классы',
                  language: 'python',
                  code: `class Person:\n    def __init__(self, name, age):\n        self.name = name\n        self.age = age\n    \n    def greet(self):\n        return f"Привет, меня зовут {self.name}!"\n    \n    def birthday(self):\n        self.age += 1\n        print(f"{self.name} теперь {self.age} лет")\n\n# Создание объекта\nalice = Person("Alice", 25)\nprint(alice.greet())  # Привет, меня зовут Alice!\nalice.birthday()      # Alice теперь 26 лет\n\n# Наследование\nclass Student(Person):\n    def __init__(self, name, age, course):\n        super().__init__(name, age)\n        self.course = course`
                }
              }
            ]
          },
          {
            id: 'python-exceptions',
            title: 'Обработка ошибок',
            description: 'try, except, finally',
            content: [
              {
                type: 'text',
                content: 'Ошибки в Python обрабатываются с помощью конструкции try/except. Это позволяет программе не падать при ошибках.'
              },
              {
                type: 'code',
                content: {
                  title: 'Исключения',
                  language: 'python',
                  code: `try:\n    result = 10 / 0\nexcept ZeroDivisionError:\n    print("На ноль делить нельзя!")\nexcept Exception as e:\n    print(f"Ошибка: {e}")\nelse:\n    print("Выполняется, если ошибок не было")\nfinally:\n    print("Это выполнится всегда")\n\n# Практический пример\ndef safe_divide(a, b):\n    try:\n        return a / b\n    except ZeroDivisionError:\n        return None\n\nprint(safe_divide(10, 2))  # 5.0\nprint(safe_divide(10, 0))  # None`
                }
              }
            ]
          }
        ]
      }
    ]
  }
];


// Генерация навигации
export const getNavItems = () => {
  return sectionsData.map(section => ({
    id: section.id,
    label: section.title,
    path: `/section/${section.id}`
  }));
};