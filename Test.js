// Copyright (c) 2016 Abitvin <foss@abitvin.net>
// Licensed under the MIT license <LICENSE-MIT or http://opensource.org/licenses/MIT>
// This file may not be copied, modified, or distributed except according to those terms.
var Abitvin;
(function (Abitvin) {
    var Test = (function () {
        function Test(name) {
            this._totalFailed = 0;
            this._totalSuccess = 0;
            var tableEl = document.createElement("table");
            tableEl.className = "unit-tests";
            document.body.appendChild(tableEl);
            // Caption
            var captionEl = document.createElement("caption");
            captionEl.textContent = name;
            tableEl.appendChild(captionEl);
            // Head
            var cellEl1 = document.createElement("td");
            var cellEl2 = document.createElement("th");
            var cellEl3 = document.createElement("th");
            var cellEl4 = document.createElement("th");
            cellEl2.textContent = "Success";
            cellEl3.textContent = "Failed";
            cellEl4.textContent = "Checks";
            var headRowEl = tableEl.createTHead().insertRow();
            headRowEl.appendChild(cellEl1);
            headRowEl.appendChild(cellEl2);
            headRowEl.appendChild(cellEl3);
            headRowEl.appendChild(cellEl4);
            // Body
            this._tbodyEl = tableEl.createTBody();
            // Foot
            cellEl1 = document.createElement("th");
            cellEl2 = document.createElement("td");
            cellEl3 = document.createElement("td");
            cellEl4 = document.createElement("td");
            cellEl1.textContent = "Total";
            cellEl2.className = "success";
            cellEl3.className = "failed";
            cellEl4.className = "checks";
            this._footRowEl = tableEl.createTFoot().insertRow();
            this._footRowEl.appendChild(cellEl1);
            this._footRowEl.appendChild(cellEl2);
            this._footRowEl.appendChild(cellEl3);
            this._footRowEl.appendChild(cellEl4);
        }
        Test.prototype.it = function (name, fn) {
            var _this = this;
            var rowEl = this._tbodyEl.insertRow();
            rowEl.classList.add("unit-test");
            rowEl.classList.add("running");
            var cellEl1 = document.createElement("th");
            var cellEl2 = document.createElement("td");
            var cellEl3 = document.createElement("td");
            var cellEl4 = document.createElement("td");
            cellEl1.textContent = name;
            cellEl2.setAttribute("data-success", "0");
            cellEl3.setAttribute("data-failed", "0");
            cellEl4.setAttribute("data-checks", "0");
            cellEl1.className = "name";
            cellEl2.className = "success";
            cellEl3.className = "failed";
            cellEl4.className = "checks";
            rowEl.appendChild(cellEl1);
            rowEl.appendChild(cellEl2);
            rowEl.appendChild(cellEl3);
            rowEl.appendChild(cellEl4);
            var failed = 0;
            var success = 0;
            var assertFn = function (result) {
                if (result) {
                    success++;
                    _this._totalSuccess++;
                }
                else {
                    failed++;
                    _this._totalFailed++;
                }
                cellEl2.setAttribute("data-success", "" + success);
                cellEl3.setAttribute("data-failed", "" + failed);
                cellEl4.setAttribute("data-checks", "" + (success + failed));
            };
            var doneFn = function () {
                rowEl.classList.remove("running");
                cellEl2.setAttribute("data-success", "" + success);
                cellEl3.setAttribute("data-failed", "" + failed);
                cellEl4.setAttribute("data-checks", "" + (success + failed));
                _this._footRowEl.children[1].setAttribute("data-success", "" + _this._totalSuccess);
                _this._footRowEl.children[2].setAttribute("data-failed", "" + _this._totalFailed);
                _this._footRowEl.children[3].setAttribute("data-checks", "" + (_this._totalFailed + _this._totalSuccess));
            };
            fn(assertFn, doneFn);
            return this;
        };
        return Test;
    }());
    Abitvin.Test = Test;
})(Abitvin || (Abitvin = {}));
//# sourceMappingURL=Test.js.map