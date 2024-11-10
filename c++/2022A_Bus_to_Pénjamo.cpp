#include <iostream>
#include <vector>
#include <algorithm>
#include <functional>

using namespace std;

int main(){
    vector<int> f = {2, 3, 1};
    sort(f.begin(), f.end(), greater<int>());

    vector<int> e = {};
    vector<int> o = {};

    int fs = f.size();

    int r = 3;
    int h = 0;

    for (int i = 0; i < fs; i++){
        if (f[i] % 2 == 0){
            e.push_back(f[i]);
        } else {
            o.push_back(f[i]);
        }
    };

    int es = e.size();

    if (es > 0){
        for (int n: e){
            r -= (n / 2);
            h += n;
        }
    }

    int os = o.size();

    for (int i = 0; i < os; i++){
        if (o[i] > 1){
            int g = (o[i] / 2);
            r -= g;
            h += g * 2;
            o[i] = 1;
        }
    };

    while (r > 0 and os > 0){
        if (os > r){
            os -= 2;
            r -= 1;
        } else if (os <= r){
            h += os;
            r -= os;
            os = 0;
        }
    }

    cout << h << endl;

    return 0;

}