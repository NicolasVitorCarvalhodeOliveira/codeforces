#include <iostream>
#include <cstring>
using namespace std;

int main(){
    int q;
    cin >> q;

    for (int i = 0; i < q; i++){
        char s[100];
        cin >> s;

        char t[100];
        cin >> t;

        int is = 0;
        int it = 0;

        int ls = strlen(s);
        int lt = strlen(t);

        int time = 0;

        int till = 0;

        for (int i = 0 ; i < ls; i++){
            if (s[i] == t[i]){
                till++;
            } else {
                break;
            }
        }

        if (till > 0){
            for (int i = 0; i < till; i++){
                is++;
                time++;
            }
            it = is;
            time++;

            if (is < ls - 1){
                for (int i = is; i < ls; i++){
                    time++;
                }
            }


            if (it < lt - 1){
                for (int i = it; i < lt; i++){
                    time++;
                }
            }
        } else {
            time += strlen(s) + strlen(t);
        }

        cout << time << endl;
    }


    return 0;
}