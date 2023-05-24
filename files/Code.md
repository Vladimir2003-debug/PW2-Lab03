### example code in markdown

- CODIGO EN JAVA

```java
    public static void trianguloRecursivo(int n){
        //triangulo recursivo
        if(n == 1)
            System.out.println("*");
        else {
            trianguloRecursivo(n-1);
            for(int i = 0; i < n; i++)
                System.out.print("*");
            System.out.println();
        }
    }
```
- CODIGO EN PERL

```perl
#!/usr/bin/perl
use strict;
use warnings;
use CGI;

my $q=CGI->new;
my $a=$q->param('a');
my $b=$q->param('b');
my $resp=$a+$b;

print $q->header('text.html');

print "LA SUMA ES: $resp";

```

- CODIGO EN PYTHON

```python

def factorial(n):
    if n == 0:
        return 1
    else:
        return n * factorial(n - 1)
        
```
