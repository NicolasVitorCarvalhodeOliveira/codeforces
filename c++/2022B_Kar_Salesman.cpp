#include <iostream>
#include <vector>
#include <algorithm>
#include <functional>
#include <chrono>

using namespace std;

int main(){
    auto start = chrono::high_resolution_clock::now();

    vector<int> cars = {2, 5, 3, 3, 5, 2, 5};
    sort(cars.begin(), cars.end(), greater<int>());

    int l = 4;

    int c = 0;

    while (cars.size() > 0){
        int i = 0;
        int s = 0;
        while (s <= l){
            try{
                if (cars.at(i) - 1 > 0){
                    cars[i]--;
                    s++;
                }
                else{
                    cars.erase(cars.begin() + i);
                }
                i++;
            }
            catch (const out_of_range &e){
                break;
            }
        }
        c++;
    }

    cout << c << endl;

    auto end = chrono::high_resolution_clock::now();

    auto t = chrono::duration_cast<chrono::milliseconds>(end - start);

    cout << t.count() << endl;

    return 0;
}