#include <iostream>
#include <vector>
#include <algorithm>
#include <numeric>

using namespace std;

int main(){
    vector<int> a = {1, 2, 1, 1, 1, 25};

    double e = (1.0/a.size()) * 100;

    if (e >= 50){
        cout << -1 << endl;
        return 0;
    }

    int s = 50 / e;
    int i = s;

    sort(a.begin(), a.end());

    int t = accumulate(a.begin(), a.end(), 0);
    int m = t/a.size();
    int hm = m / 2;

    if (a[i]>=hm){
        /*
        x + t/ len(a) * 2 > a[i]
        */
        int x = (a[i] * (a.size() * 2)) - t;
        cout << x + 1 << endl;
        return 0;
    } else {
        cout << 0 << endl;
        return 0;
    }


    return 0;
}
