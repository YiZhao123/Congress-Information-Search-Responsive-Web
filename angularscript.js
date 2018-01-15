var mainurl = "http://homeworkeight.appspot.com/dataget.php";

var app = angular.module("app", ['angularUtils.directives.dirPagination', 'ui.bootstrap']);

app.controller("datacontroller", function ($scope, $http) {
    //localstore
    $scope.favolegi = [];
    $scope.favobill = [];
    $scope.favocomm = [];
    var locallegi = localStorage.getItem("favoritelegis");
    var localbill = localStorage.getItem("favoritebills");
    var localcomm = localStorage.getItem("favoritecomms");
    if (locallegi != undefined && locallegi != null) {
        $scope.favolegi = JSON.parse(locallegi);
    }
    if (localbill != undefined && localbill != null) {
        $scope.favobill = JSON.parse(localbill);
    }
    if (localcomm != undefined && localcomm != null) {
        $scope.favocomm = JSON.parse(localcomm);
    }

    //set the default sort type
    $scope.sortType1 = 'state';
    $scope.sortType2 = 'last_name';

    $scope.alllegislator = [];

    $scope.allstateidandname = [
        'Alabama', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'District Of Columbia', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Dakota', 'North Carolina', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
    ];
    var url = mainurl + "?operation=showalllegilators";
    $http.get(url).then(function successCallback(response) {
        $scope.totalnumber = response.data.results.length;
        $scope.alllegislatorbegin = response.data.results;

        angular.forEach($scope.alllegislatorbegin, function (onelegi) {
            if (onelegi.district == null) {
                onelegi.district = "N.A";
            } else {
                onelegi.district = "District" + " " + onelegi.district;
            }
            if (onelegi.party == "R") {
                onelegi.party = "r.png";
            } else {
                onelegi.party = "d.png";
            }
            if (onelegi.chamber == "house") {
                onelegi.chamber = {
                    "pic": "h.png",
                    "textcont": "House"
                };
            }
            if (onelegi.chamber == "senate") {
                onelegi.chamber = {
                    "pic": "s.svg",
                    "textcont": "Senate"
                };
            }
        });

        $scope.alllegislator = $scope.alllegislatorbegin;

        $scope.imgsrc = "";
        $scope.fullname = "";
        $scope.mailadd = "";
        $scope.chambertype = "";
        $scope.phonenumber = "";
        $scope.partyimgsrc = "";
        $scope.partyname = "";
        $scope.startterm = "";
        $scope.endterm = "";
        $scope.dynamic = 0;
        $scope.officeadd = "";
        $scope.statename = "";
        $scope.faxnumber = "";
        $scope.birthday = "";
        $scope.twitterlink = "";
        $scope.twittersrc = "";
        $scope.facebooklink = "";
        $scope.facebooksrc = "";
        $scope.weblink = "";
        $scope.websrc = "";
        $scope.bioid = "";
        $scope.containsbillurlsss = "javascript:void(0);";
        $scope.showlegiDetail = function (onedetailleg) {
            /*$("#mainbgbills").hide();
            $("#mainbgcomms").hide();
            $("#mainbgfavo").hide();
            $("#mainbg").show();
            $("#itemzerolegidetails").removeClass("active");
            $("#unilegidetails").addClass("active");*/

            $scope.onefavolegi = onedetailleg;

            $scope.bioid = onedetailleg.bioguide_id;
            $scope.imgsrc = "http://theunitedstates.io/images/congress/original/" + onedetailleg.bioguide_id + ".jpg";
            $scope.fullname = onedetailleg.title + "." + onedetailleg.last_name + "," + onedetailleg.first_name;
            $scope.mailadd = onedetailleg.oc_email;
            $scope.chambertype = onedetailleg.chamber.textcont;
            $scope.phonenumber = onedetailleg.phone;
            if (onedetailleg.party == "r.png") {
                $scope.partyimgsrc = "r.png";
                $scope.partyname = "Republic";
            } else {
                $scope.partyimgsrc = "d.png";
                $scope.partyname = "Democrat";
            }
            //date
            var str = onedetailleg.term_start;
            var date = str.split("-");
            $scope.startterm = date[1] + "-" + date[2] + "-" + date[0];
            var ostartdate = new Date(parseInt(date[0]), parseInt(date[1]) - 1, parseInt(date[2]));

            var str2 = onedetailleg.term_end;
            var date2 = str2.split("-");
            $scope.endterm = date2[1] + "-" + date2[2] + "-" + date2[0];
            var oenddate = new Date(parseInt(date2[0]), parseInt(date2[1]) - 1, parseInt(date2[2]));

            var nowdate = new Date();

            var idays = (oenddate.getTime() - ostartdate.getTime()) / (1000 * 60 * 60 * 24);
            var jdays = (nowdate.getTime() - ostartdate.getTime()) / (1000 * 60 * 60 * 24);
            $scope.dynamic = Math.round(100 * jdays / idays);

            //office state fax
            $scope.officeadd = onedetailleg.office;
            $scope.statename = onedetailleg.state_name;
            if (onedetailleg.fax != null) {
                $scope.faxnumber = onedetailleg.fax;
            }
            //birthday
            var str3 = onedetailleg.birthday;
            var date3 = str3.split("-");
            $scope.birthday = date3[1] + "-" + date3[2] + "-" + date3[0];
            //social links
            if (onedetailleg.twitter_id == null) {
                $scope.twitterlink = "javascript:void(0)";
                $scope.twittersrc = "";
            } else {
                $scope.twitterlink = "http://twitter.com/" + onedetailleg.twitter_id;
                $scope.twittersrc = "t.png";
            }
            if (onedetailleg.facebook_id == null || onedetailleg.facebook_id == undefined) {
                $scope.facebooklink = "javascript:void(0)";
                $scope.facebooksrc = "";
            } else {
                $scope.facebooklink = "http://www.facebook.com/" + onedetailleg.facebook_id;
                $scope.facebooksrc = "f.png";
            }
            if (onedetailleg.website == null) {
                $scope.weblink = "javascript:void(0)";
                $scope.websrc = "";
            } else {
                $scope.weblink = onedetailleg.website;
                $scope.websrc = "w.png";
            }

            var legicommurl = mainurl + "?operation=showfivecomm&bioguide_id=" + onedetailleg.bioguide_id;
            $http.get(legicommurl).then(function successCallback(response) {
                $scope.legicommfive = response.data.results;
                angular.forEach($scope.legicommfive, function (onelegicomm) {
                    if (onelegicomm.chamber == "house") {
                        onelegicomm.chamber = "House";
                    }
                    if (onelegicomm.chamber == "senate") {
                        onelegicomm.chamber = "Senate";
                    }
                });
            }, function errorCallback(response) {
                console.error(response);
            });

            var legibillurl = mainurl + "?operation=showfivebill&lastname=" + onedetailleg.last_name + "&firstname=" + onedetailleg.first_name;
            $http.get(legibillurl).then(function successCallback(response) {
                $scope.legibillfive = response.data.results;

                $scope.isbillurlnull = function (item) {
                    if (item.last_version == undefined || item.last_version.urls == undefined || item.last_version.urls.pdf == undefined || item.last_version.urls.pdf == null) {
                        return $scope.containsbillurlsss;
                    } else {
                        return item.last_version.urls.pdf;
                    }
                }
                $scope.iscontainvalidbillurl = function (item) {
                    if (item.last_version == undefined || item.last_version.urls == undefined || item.last_version.urls.pdf == undefined || item.last_version.urls.pdf == null) {
                        return "";
                    } else {
                        return "Link";
                    }
                }

            }, function errorCallback(response) {
                console.error(response);
            });

        };

    }, function errorCallback(response) {
        console.error(response);
    });


    //all the active bills
    var url = mainurl + "?operation=showallactivebills";
    $http.get(url).then(function successCallback(response) {

        $scope.allbillsbegin = response.data.results;
        $scope.allactivebills = "";
        $scope.allnewbills = "";

        angular.forEach($scope.allbillsbegin, function (onebill) {
            onebill.bill_id = onebill.bill_id.toUpperCase();
            onebill.bill_type = onebill.bill_type.toUpperCase();
            if (onebill.chamber == "house") {
                onebill.chamber = {
                    "pic": "h.png",
                    "textcont": "House"
                };
            }
            if (onebill.chamber == "senate") {
                onebill.chamber = {
                    "pic": "s.svg",
                    "textcont": "Senate"
                };
            }

        });
        //billdetal
        $scope.billid = "";
        $scope.alltitle = "";
        $scope.billtype = "";
        $scope.spon = "";
        $scope.cham = "";
        $scope.sta = "";
        $scope.intro = "";
        $scope.congressurl = "";
        $scope.verstatus = "";
        $scope.billurl = "";
        $scope.showbillDetail = function (onedetailbill) {

            $scope.onefavobill = onedetailbill;


            $scope.billid = onedetailbill.bill_id;
            $scope.alltitle = onedetailbill.official_title;
            $scope.billtype = onedetailbill.bill_type;
            $scope.spon = onedetailbill.sponsor.title + ". " + onedetailbill.sponsor.last_name + ", " + onedetailbill.sponsor.first_name;
            $scope.cham = onedetailbill.chamber.textcont;
            if (onedetailbill.history.active == true) {
                $scope.sta = "Active";
            } else {
                $scope.sta = "New";
            }
            var str5 = onedetailbill.introduced_on;
            var date5 = str5.split("-");
            $scope.intro = date5[1] + "-" + date5[2] + "-" + date5[0];

            $scope.congressurl = onedetailbill.urls.congress;
            $scope.verstatus = onedetailbill.last_version.version_name;
            $scope.containsbillurl = function (billurl) {
                if (onedetailbill.last_version.urls.pdf == undefined) {
                    return false;
                } else {
                    return true;
                }
            }
            $scope.billurl = onedetailbill.last_version.urls.pdf;

        }

    }, function errorCallback(response) {
        console.error(response);
    });
    //all the new bills
    var url = mainurl + "?operation=showallnewbills";
    $http.get(url).then(function successCallback(response) {

        $scope.allbillsbeginnew = response.data.results;
        $scope.allactivebills = "";
        $scope.allnewbills = "";

        angular.forEach($scope.allbillsbeginnew, function (onebill) {
            onebill.bill_id = onebill.bill_id.toUpperCase();
            onebill.bill_type = onebill.bill_type.toUpperCase();
            if (onebill.chamber == "house") {
                onebill.chamber = {
                    "pic": "h.png",
                    "textcont": "House"
                };
            }
            if (onebill.chamber == "senate") {
                onebill.chamber = {
                    "pic": "s.svg",
                    "textcont": "Senate"
                };
            }

        });
        //billdetal
        $scope.billid = "";
        $scope.alltitle = "";
        $scope.billtype = "";
        $scope.spon = "";
        $scope.cham = "";
        $scope.sta = "";
        $scope.intro = "";
        $scope.congressurl = "";
        $scope.verstatus = "";
        $scope.billurl = "";
        $scope.showbillDetailnew = function (onedetailbill) {
            $scope.billid = onedetailbill.bill_id;
            $scope.alltitle = onedetailbill.official_title;
            $scope.billtype = onedetailbill.bill_type;
            $scope.spon = onedetailbill.sponsor.title + ". " + onedetailbill.sponsor.last_name + ", " + onedetailbill.sponsor.first_name;
            $scope.cham = onedetailbill.chamber.textcont;
            if (onedetailbill.history.active == true) {
                $scope.sta = "Active";
            } else {
                $scope.sta = "New";
            }
            var str5 = onedetailbill.introduced_on;
            var date5 = str5.split("-");
            $scope.intro = date5[1] + "-" + date5[2] + "-" + date5[0];

            $scope.congressurl = onedetailbill.urls.congress;
            $scope.verstatus = onedetailbill.last_version.version_name;
            $scope.containsbillurl = function (billurl) {
                if (onedetailbill.last_version.urls.pdf == undefined) {
                    return false;
                } else {
                    return true;
                }
            }
            $scope.billurl = onedetailbill.last_version.urls.pdf;

        }

    }, function errorCallback(response) {
        console.error(response);
    });


    //all the committees
    var url = mainurl + "?operation=showallcomm";
    $http.get(url).then(function successCallback(response) {
        $scope.allcommsbegin = response.data.results;

        angular.forEach($scope.allcommsbegin, function (onecomm) {

            if (onecomm.chamber == "house") {
                onecomm.chamber = {
                    "pic": "h.png",
                    "textcont": "House"
                };
            }
            if (onecomm.chamber == "senate") {
                onecomm.chamber = {
                    "pic": "s.svg",
                    "textcont": "Senate"
                };
            }
            if (onecomm.chamber == "joint") {
                onecomm.chamber = {
                    "pic": "s.svg",
                    "textcont": "Joint"
                };
            }

        });
        $scope.myFilterofhousecomm = function (item) {
            return item.chamber.textcont == "House";
        };
        $scope.myFilterofsenatecomm = function (item) {
            return item.chamber.textcont == "Senate";
        };
        $scope.myFilterofjointecomm = function (item) {
            return item.chamber.textcont == "Joint";
        };
        $scope.isofficenull = function (item) {
            if (item.office == undefined) {
                return "N.A";
            } else {
                return item.office;
            }
        }


    }, function errorCallback(response) {
        console.error(response);
    });

    //favorite the legi
    $scope.togglefavolegi = function (item) {
        var posi = $scope.iscontainlegi(item);
        if (posi < 0) {
            $scope.favolegi.push(item);
        } else {
            $scope.favolegi.splice(posi, 1);
        }
        localStorage.setItem("favoritelegis", JSON.stringify($scope.favolegi));
    }
    $scope.iscontainlegi = function (item) {
        for (var i = 0; i < $scope.favolegi.length; i++) {
            if ($scope.favolegi[i].bioguide_id == item.bioguide_id) {
                return i;
            }
        }
        return -10;
    };
    //favorite the bill
    $scope.togglefavobill = function (item) {
        var posi = $scope.iscontainbill(item);
        if (posi < 0) {
            $scope.favobill.push(item);
        } else {
            $scope.favobill.splice(posi, 1);
        }
        localStorage.setItem("favoritebills", JSON.stringify($scope.favobill));
    }
    $scope.iscontainbill = function (item) {
        for (var i = 0; i < $scope.favobill.length; i++) {
            if ($scope.favobill[i].bill_id == item.bill_id) {
                return i;
            }
        }
        return -10;
    };
    //favorite the comm
    $scope.togglefavocomm = function (item) {
        var posi = $scope.iscontaincomm(item);
        if (posi < 0) {
            $scope.favocomm.push(item);
        } else {
            $scope.favocomm.splice(posi, 1);
        }
        localStorage.setItem("favoritecomms", JSON.stringify($scope.favocomm));
    };
    $scope.iscontaincomm = function (item) {
        for (var i = 0; i < $scope.favocomm.length; i++) {
            if ($scope.favocomm[i].committee_id == item.committee_id) {
                return i;
            }
        }
        return -10;
    };
    //remove the favo legi
    $scope.removethelegi = function (item) {
        var posi = $scope.iscontainlegi(item);
        if (posi >= 0) {
            $scope.favolegi.splice(posi, 1);
        }
        localStorage.setItem("favoritelegis", JSON.stringify($scope.favolegi));
    };
    //remove the favo bill
    $scope.removethebill = function (item) {
        var posi = $scope.iscontainbill(item);
        if (posi >= 0) {
            $scope.favobill.splice(posi, 1);
        }
        localStorage.setItem("favoritebills", JSON.stringify($scope.favobill));
    };
    //remove the favo comm
    $scope.removethecomm = function (item) {
        var posi = $scope.iscontaincomm(item);
        if (posi >= 0) {
            $scope.favocomm.splice(posi, 1);
        }
        localStorage.setItem("favoritecomms", JSON.stringify($scope.favocomm));
    };

    $scope.showlegiDetailfavo = function (onedetailleg) {
        $("#mainbgbills").hide();
        $("#mainbgcomms").hide();
        $("#mainbgfavo").hide();
        $("#mainbg").show();
        $("#itemzerolegidetails").removeClass("active");
        $("#unilegidetails").addClass("active");

        $scope.onefavolegi = onedetailleg;

        $scope.bioid = onedetailleg.bioguide_id;
        $scope.imgsrc = "http://theunitedstates.io/images/congress/original/" + onedetailleg.bioguide_id + ".jpg";
        $scope.fullname = onedetailleg.title + "." + onedetailleg.last_name + "," + onedetailleg.first_name;
        $scope.mailadd = onedetailleg.oc_email;
        $scope.chambertype = onedetailleg.chamber.textcont;
        $scope.phonenumber = onedetailleg.phone;
        if (onedetailleg.party == "r.png") {
            $scope.partyimgsrc = "r.png";
            $scope.partyname = "Republic";
        } else {
            $scope.partyimgsrc = "d.png";
            $scope.partyname = "Democrat";
        }
        //date
        var str = onedetailleg.term_start;
        var date = str.split("-");
        $scope.startterm = date[1] + "-" + date[2] + "-" + date[0];
        var ostartdate = new Date(parseInt(date[0]), parseInt(date[1]) - 1, parseInt(date[2]));

        var str2 = onedetailleg.term_end;
        var date2 = str2.split("-");
        $scope.endterm = date2[1] + "-" + date2[2] + "-" + date2[0];
        var oenddate = new Date(parseInt(date2[0]), parseInt(date2[1]) - 1, parseInt(date2[2]));

        var nowdate = new Date();

        var idays = (oenddate.getTime() - ostartdate.getTime()) / (1000 * 60 * 60 * 24);
        var jdays = (nowdate.getTime() - ostartdate.getTime()) / (1000 * 60 * 60 * 24);
        $scope.dynamic = Math.round(100 * jdays / idays);

        //office state fax
        $scope.officeadd = onedetailleg.office;
        $scope.statename = onedetailleg.state_name;
        if (onedetailleg.fax != null) {
            $scope.faxnumber = onedetailleg.fax;
        }
        //birthday
        var str3 = onedetailleg.birthday;
        var date3 = str3.split("-");
        $scope.birthday = date3[1] + "-" + date3[2] + "-" + date3[0];
        //social links
        if (onedetailleg.twitter_id == null) {
            $scope.twitterlink = "javascript:void(0)";
            $scope.twittersrc = "";
        } else {
            $scope.twitterlink = "http://twitter.com/" + onedetailleg.twitter_id;
            $scope.twittersrc = "t.png";
        }
        if (onedetailleg.facebook_id == null || onedetailleg.facebook_id == undefined) {
            $scope.facebooklink = "javascript:void(0)";
            $scope.facebooksrc = "";
        } else {
            $scope.facebooklink = "http://www.facebook.com/" + onedetailleg.facebook_id;
            $scope.facebooksrc = "f.png";
        }
        if (onedetailleg.website == null) {
            $scope.weblink = "javascript:void(0)";
            $scope.websrc = "";
        } else {
            $scope.weblink = onedetailleg.website;
            $scope.websrc = "w.png";
        }

        var legicommurl = mainurl + "?operation=showfivecomm&bioguide_id=" + onedetailleg.bioguide_id;
        $http.get(legicommurl).then(function successCallback(response) {
            $scope.legicommfive = response.data.results;
            angular.forEach($scope.legicommfive, function (onelegicomm) {
                if (onelegicomm.chamber == "house") {
                    onelegicomm.chamber = "House";
                }
                if (onelegicomm.chamber == "senate") {
                    onelegicomm.chamber = "Senate";
                }
            });
        }, function errorCallback(response) {
            console.error(response);
        });

        var legibillurl = mainurl + "?operation=showfivebill&lastname=" + onedetailleg.last_name + "&firstname=" + onedetailleg.first_name;
        $http.get(legibillurl).then(function successCallback(response) {
            $scope.legibillfive = response.data.results;

            $scope.isbillurlnull = function (item) {
                if (item.last_version == undefined || item.last_version.urls == undefined || item.last_version.urls.pdf == undefined || item.last_version.urls.pdf == null) {
                    return $scope.containsbillurlsss;
                } else {
                    return item.last_version.urls.pdf;
                }
            }
            $scope.iscontainvalidbillurl = function (item) {
                if (item.last_version == undefined || item.last_version.urls == undefined || item.last_version.urls.pdf == undefined || item.last_version.urls.pdf == null) {
                    return "";
                } else {
                    return "Link";
                }
            }

        }, function errorCallback(response) {
            console.error(response);
        });

    }

    $scope.showbillDetailfavo = function (onedetailbill) {
        $("#mainbg").hide();
        $("#mainbgcomms").hide();
        $("#mainbgfavo").hide();
        $("#mainbgbills").show();
        $("#billnomoral").removeClass("active");
        $("#billdetailpage").addClass("active");

        $scope.onefavobill = onedetailbill;


        $scope.billid = onedetailbill.bill_id;
        $scope.alltitle = onedetailbill.official_title;
        $scope.billtype = onedetailbill.bill_type;
        $scope.spon = onedetailbill.sponsor.title + ". " + onedetailbill.sponsor.last_name + ", " + onedetailbill.sponsor.first_name;
        $scope.cham = onedetailbill.chamber.textcont;
        if (onedetailbill.history.active == true) {
            $scope.sta = "Active";
        } else {
            $scope.sta = "New";
        }
        var str5 = onedetailbill.introduced_on;
        var date5 = str5.split("-");
        $scope.intro = date5[1] + "-" + date5[2] + "-" + date5[0];

        $scope.congressurl = onedetailbill.urls.congress;
        $scope.verstatus = onedetailbill.last_version.version_name;
        $scope.containsbillurl = function (billurl) {
            if (onedetailbill.last_version.urls.pdf == undefined) {
                return false;
            } else {
                return true;
            }
        }
        $scope.billurl = onedetailbill.last_version.urls.pdf;

    }

});