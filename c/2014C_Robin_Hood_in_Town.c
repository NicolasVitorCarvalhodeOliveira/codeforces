#include <stdio.h>
#include <stdlib.h>
#include <math.h>

int compare(const void *a, const void *b)
{
    return *(int *)a - *(int *)b;
}

int main()
{
    int w[] = {4, 3, 1, 2};

    int l = sizeof(w) / sizeof(w[0]);

    qsort(w, l, sizeof(int), compare);

    for (int i = 0; i < l; i++)
    {
        printf("index:%d value:%d\n", i, w[i]);
    }

    printf("\n");

    float e = (1.0 / (l)) * 100;

    int i = round(50 / e) - 1;

    if (50 >= i * e)
    {
        i += 1;
    };

    int tm = 0;

    for (int i = 0; i < l; i++)
    {
        tm += w[i];
    };

    float m = (tm / l) / 2;

    int ri = l - 1;

    if (w[i] < m){
        printf("He is sad");
    }else{
        printf("He is not sad yet\n");
        int x = (w[i] * (l * 2)) - tm;
        x += 1;
        printf("%d\n", x);

    }

    return 0;
}
