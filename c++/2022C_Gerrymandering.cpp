#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<vector<char>> h = {
        {'A', 'J', 'J', 'J', 'A', 'J'},
        {'A', 'J', 'J', 'A', 'A', 'A'}
    };

    int v = 0;

    for (int i = 0; i < h[1].size(); i+= 3){
        int a = 0;
        if (h[0][i] == 'A') a++;
        if (h[0][i + 1] == 'A') a++;
        if (h[0][i + 2] == 'A') a++;

        if (h[1][i] == 'A') a++;
        if (h[1][i + 1] == 'A') a++;
        if (h[1][i + 2] == 'A') a++;

        if (a >= 4){
            v += 2;
        } else if (a >= 2){
            v += 1;
        }
    }
    cout << v << endl;
    return 0;
}
