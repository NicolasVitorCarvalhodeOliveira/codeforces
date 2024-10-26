#include <iostream>
#include <vector>
using namespace std;

int main(){
    int n = 7;
    int q = 0;

    vector<int> p = {0, 1, -1, 0};

    if (q <= 69 + n){
        int i = 1;
        int j = 2;

        while (true){
            int ai;
            cout.flush() << "? " << i << " " << j << endl;
            q++;
            cin >> ai;

            int aj;
            cout.flush() << "? " << j << " " << i << endl;
            q++;
            cin >> aj;

            if (ai == aj){
                if (j + 1 <= p.size()) j++;
                else{
                    int input;
                    cout.flush() << "! " << -999 << endl;
                    cin >> input;
                    exit(0);
                }
            } else{
                if (j > 2){
                    cout.flush() << "! " << j << endl;
                    break;
                }
                else if (j == 2){
                    if (j + 1 <= p.size()){
                        int a1;
                        int a2;

                        cout.flush() << "? " << j << " " << j + 1 << endl;
                        q++;
                        cin >> a1;

                        cout.flush() << "? " << j + 1 << " " << j << endl;
                        q++;

                        cin >> a2;

                        if (a1 == a2){
                            cout.flush() << "! " << i << endl;
                            break;
                        } else{
                            cout.flush() << "! " << j << endl;
                            break;
                        }
                    }

                }
            }
        }
    } else{
        int o;
        cin >> o;
        exit(0);
    }
    return 0;
}