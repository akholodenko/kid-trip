(this.webpackJsonpclient = this.webpackJsonpclient || []).push([
  [0],
  {
    162: function(e, t, n) {
      e.exports = n(200);
    },
    172: function(e, t, n) {},
    173: function(e, t, n) {},
    200: function(e, t, n) {
      "use strict";
      n.r(t);
      var a = n(31),
        r = n(0),
        o = n.n(r),
        i = n(14),
        l = n.n(i),
        c = n(54),
        s = n(105),
        u = n(141),
        m = n(136),
        d = n(24),
        p = n(12),
        g = n(140),
        f = n(45),
        v = n(46),
        h = n(50),
        y = n(47),
        b = n(51),
        E = n(20),
        O = {
          home: "/",
          dashboard: "/dashboard",
          venue: "/venue/:venueSlug",
          venuePath: function(e) {
            return "/venue/".concat(e);
          }
        },
        j = function(e) {
          return e.pathname === O.home;
        },
        x = n(143),
        C = function(e, t) {
          return {
            container: {
              display: "flex",
              flexWrap: "wrap",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              background: "linear-gradient(rgba(0, 0, 0, 0.5),rgba(0, 0, 0, 0.5)),url(/images/".concat(
                e,
                ") 50% 50% no-repeat"
              ),
              backgroundSize: "cover",
              height: t
            },
            headerText: { color: "#ffffff" }
          };
        },
        w = C("family-biking-cmp.jpg", "700px"),
        S = function() {
          return o.a.createElement(
            "div",
            { style: w.container },
            o.a.createElement(
              x.a,
              { variant: "h2", style: w.headerText },
              o.a.createElement("strong", null, "Experience"),
              " childhood, again."
            )
          );
        },
        N =
          (n(172),
          function(e) {
            var t = e.title,
              n = e.icon,
              a = e.text,
              r = {
                background: "url(/images/icons/".concat(
                  n,
                  ".png) 0% 0% / 60px 60px no-repeat"
                ),
                width: "60px",
                height: "60px"
              };
            return o.a.createElement(
              "div",
              { className: "value-prop-section" },
              o.a.createElement("div", { className: "value-prop-title" }, t),
              o.a.createElement("div", {
                className: "value-prop-icon",
                style: r
              }),
              o.a.createElement("div", { className: "value-prop-text" }, a)
            );
          }),
        k =
          (n(173),
          {
            title: "Discover",
            icon: "discover",
            text:
              "Find out about great local places to visit with your family. From restaurants, to museums, \n\tparks and playgrounds, make the most of your time!"
          }),
        I = {
          title: "Track",
          icon: "track",
          text:
            "Had a great time sharing a meal with your family or enjoyed a hiking trail? Jot it down to build your \n\troster of go-to places for your trips."
        },
        T = {
          title: "Share",
          icon: "share",
          text:
            "Share your favorite places to visit with friends and family, and hear about what others are \n\tenjoying, for great new ideas."
        },
        $ = function() {
          return o.a.createElement(
            "div",
            { className: "value-prop-container" },
            o.a.createElement(N, k),
            o.a.createElement(N, I),
            o.a.createElement(N, T)
          );
        },
        D = function() {
          return o.a.createElement(
            "div",
            null,
            o.a.createElement(S, null),
            o.a.createElement($, null)
          );
        },
        B = n(29),
        M = n(93),
        A = n(240),
        q = n(243),
        z = n(25),
        V = n(26),
        W = n.n(V);
      function L() {
        var e = Object(z.a)([
          "\n    query ($venueId: ID!, $limit: Int, $radius: Int) {\n        similarVenues(id: $venueId, first: $limit, radius: $radius) {\n            id\n            name\n            streetAddress\n            zipcode\n            city\n        }\n    }\n"
        ]);
        return (
          (L = function() {
            return e;
          }),
          e
        );
      }
      function U() {
        var e = Object(z.a)([
          "\n    query {\n        venueTypes {\n            id\n            name\n            image\n        }\n    }\n"
        ]);
        return (
          (U = function() {
            return e;
          }),
          e
        );
      }
      function _() {
        var e = Object(z.a)([
          "\n    query {\n        me {\n            venues {\n                ...VenueDetails\n            }\n        }\n    }\n    ",
          "\n"
        ]);
        return (
          (_ = function() {
            return e;
          }),
          e
        );
      }
      function F() {
        var e = Object(z.a)([
          "\n    query ($venueSlug: String!) {\n        venueBySlug(slug: $venueSlug) {\n            ...VenueDetails\n        }\n    }\n    ",
          "\n"
        ]);
        return (
          (F = function() {
            return e;
          }),
          e
        );
      }
      function H() {
        var e = Object(z.a)([
          "\n    query ($venueId: ID!) {\n        venue(id: $venueId) {\n            ...VenueDetails\n        }\n    }\n    ",
          "\n"
        ]);
        return (
          (H = function() {
            return e;
          }),
          e
        );
      }
      function G() {
        var e = Object(z.a)([
          "\n    fragment VenueDetails on Venue {\n        id\n        name\n        slug\n        streetAddress\n        zipcode\n        city\n        state\n        lat\n        lng\n        venueTypes {\n            id\n            name\n            image\n        }\n    }\n"
        ]);
        return (
          (G = function() {
            return e;
          }),
          e
        );
      }
      var P = W()(G()),
        J = (W()(H(), P), W()(F(), P)),
        R = W()(_(), P),
        Q = W()(U()),
        K = W()(L()),
        Z = n(9),
        X = n(227),
        Y = n(228),
        ee = n(229),
        te = function(e) {
          var t = ""
            .concat(e.streetAddress, ", ")
            .concat(e.city, ", ")
            .concat(e.state, " ")
            .concat(e.zipcode);
          return "https://maps.google.com/?q=".concat(encodeURIComponent(t));
        },
        ne = n(49),
        ae = Object(Z.a)({
          "@global": {
            ".venueItem": {
              marginTop: "5px",
              marginBottom: "5px",
              backgroundColor: "#f6f6f6",
              padding: "15px"
            },
            ".venueIcon": {
              width: "15px",
              height: "auto",
              marginRight: "5px",
              position: "relative",
              top: "2px"
            }
          }
        })(function(e) {
          var t = e.venue;
          return o.a.createElement(
            "div",
            { className: "venueItem" },
            o.a.createElement(
              "div",
              null,
              o.a.createElement(
                x.a,
                { variant: "h6", component: ne.b, to: O.venuePath(t.slug) },
                t.name
              )
            ),
            o.a.createElement(
              "div",
              null,
              (function(e, t) {
                var n;
                switch (e.venueTypes[0].name) {
                  case "restaurant":
                    n = o.a.createElement(X.a, { className: t });
                    break;
                  case "outdoor playground":
                    n = o.a.createElement(Y.a, { className: t });
                    break;
                  default:
                    n = o.a.createElement(ee.a, { className: t });
                }
                return n;
              })(t, "venueIcon"),
              t.venueTypes && t.venueTypes.length
                ? "".concat(t.venueTypes[0].name, " in ")
                : "",
              o.a.createElement(
                "a",
                { href: te(t), target: "_blank", rel: "noopener noreferrer" },
                t.city,
                ", ",
                t.state
              )
            )
          );
        }),
        re = n(86),
        oe = n(248),
        ie = n(238),
        le = n(237),
        ce = n(239),
        se = n(251),
        ue = n(130),
        me = n(234),
        de = n(235),
        pe = n(132),
        ge = n.n(pe),
        fe = n(236),
        ve = n(137);
      function he() {
        var e = Object(z.a)([
          "\n\tquery ($limit: Int, $query: String) {\n\t\tcities(first: $limit, query: $query) {\n\t\t\tid\n\t\t\tname\n\t\t\tstate\n\t\t}\n\t}\n"
        ]);
        return (
          (he = function() {
            return e;
          }),
          e
        );
      }
      var ye = W()(he()),
        be = n(231),
        Ee = n(252),
        Oe = n(230),
        je = {
          container: { position: "relative", width: "500px" },
          input: {
            border: "1px solid #ccc",
            outline: "none",
            width: "300px",
            padding: "20px",
            fontSize: "17px"
          },
          suggestionsContainer: {
            position: "absolute",
            width: "300px",
            top: 62,
            left: 0,
            border: "1px solid #efefef"
          },
          suggestionItem: { width: "100%", padding: "10px" },
          formControl: {
            minWidth: "500px",
            marginTop: "16px",
            marginBottom: "8px",
            height: "16px"
          }
        },
        xe = Object(be.b)(function(e) {
          var t = e.client,
            n = e.onCitySelected,
            a = Object(r.useState)(""),
            i = Object(B.a)(a, 2),
            l = i[0],
            c = i[1],
            s = Object(r.useState)({}),
            u = Object(B.a)(s, 2),
            m = u[0],
            d = u[1],
            p = Object(r.useState)([]),
            g = Object(B.a)(p, 2),
            f = g[0],
            v = g[1];
          Object(r.useEffect)(
            function() {
              l && l.length >= 3
                ? (function(e) {
                    return t.query({
                      query: ye,
                      variables: { limit: 10, query: e }
                    });
                  })(l).then(function(e) {
                    var t = e.data;
                    v(
                      t.cities.map(function(e) {
                        return {
                          value: e.id,
                          label: "".concat(e.name, ", ").concat(e.state)
                        };
                      })
                    );
                  })
                : v([]);
            },
            [l, t]
          );
          return o.a.createElement(
            "div",
            { style: je.container },
            o.a.createElement(
              Oe.a,
              { style: je.formControl },
              o.a.createElement(
                Ee.a,
                { shrink: !0, htmlFor: "age-simple" },
                "City"
              )
            ),
            o.a.createElement(ve.a, {
              value: m,
              onChange: function(e) {
                d(e), n(e);
              },
              options: f,
              onInputChange: function(e) {
                c(e);
              },
              placeholder: "Type in name of city",
              isClearable: !0,
              menuIsOpen: f && f.length,
              escapeClearsValue: !0
            })
          );
        }),
        Ce = n(246),
        we = n(250),
        Se = {
          formControl: {
            minWidth: "500px",
            marginTop: "16px",
            marginBottom: "8px"
          }
        },
        Ne = function(e) {
          var t = e.onVenueTypeSelected,
            n = Object(r.useState)(""),
            a = Object(B.a)(n, 2),
            i = a[0],
            l = a[1];
          return o.a.createElement(M.b, { query: Q }, function(e) {
            var n = e.loading,
              a = e.error,
              r = e.data;
            if (n) return "Loading...";
            if (a) return "Error! ".concat(a.message);
            var c = r.venueTypes;
            return o.a.createElement(
              Oe.a,
              { style: Se.formControl },
              o.a.createElement(Ee.a, { htmlFor: "age-simple" }, "Venue Type"),
              o.a.createElement(
                Ce.a,
                {
                  value: i,
                  onChange: function(e) {
                    return (n = e.target.value), l(n), void t(n);
                    var n;
                  },
                  inputProps: { name: "type", id: "venue-type" }
                },
                c.map(function(e) {
                  return o.a.createElement(
                    we.a,
                    { key: e.id, value: e.id },
                    e.name
                  );
                })
              )
            );
          });
        };
      function ke() {
        var e = Object(z.a)([
          "\n    mutation CreateVenueMutation($name: String!, $streetAddress: String!, \n        $zipcode: Int!, $cityId: Int!, $typeId: Int!) {\n        createVenue (\n            name: $name\n            streetAddress: $streetAddress\n            zipcode: $zipcode\n            city: {\n                id: $cityId\n            }\n            venueType: {\n                id: $typeId\n            }\n        ) {\n            id\n            name\n            streetAddress\n            venueTypes {\n                name\n            }\n        }\n    }\n"
        ]);
        return (
          (ke = function() {
            return e;
          }),
          e
        );
      }
      var Ie = W()(ke()),
        Te = n(71),
        $e = {
          appBar: { position: "relative" },
          title: { margin: "0 auto" },
          body: { margin: "0 auto" },
          input: { minWidth: "500px" }
        },
        De = {
          name: "",
          type: { id: null },
          streetAddress: "",
          zipcode: "",
          lat: "",
          lng: "",
          city: {}
        },
        Be = function(e) {
          var t = Object(Te.a)(Ie, {
              onError: function(e) {
                console.log("error", e);
              },
              onCompleted: function(e) {
                console.log("data", e);
              },
              refetchQueries: [{ query: R }]
            }),
            n = Object(B.a)(t, 1)[0],
            i = Object(r.useState)(Object(a.a)({}, De)),
            l = Object(B.a)(i, 2),
            c = l[0],
            s = l[1],
            u = Object(r.useState)("Please enter information about a venue"),
            m = Object(B.a)(u, 2),
            d = m[0],
            p = m[1],
            g = function(e) {
              return function(t) {
                console.log(e, t.target.value),
                  s(Object(a.a)({}, c, Object(re.a)({}, e, t.target.value)));
              };
            };
          return o.a.createElement(
            oe.a,
            {
              open: e.open,
              onClose: e.toggleDialog,
              fullScreen: !0,
              "aria-labelledby": "form-dialog-title"
            },
            o.a.createElement(
              me.a,
              { style: $e.appBar },
              o.a.createElement(
                de.a,
                null,
                o.a.createElement(
                  fe.a,
                  {
                    edge: "start",
                    color: "inherit",
                    onClick: e.toggleDialog,
                    "aria-label": "close"
                  },
                  o.a.createElement(ge.a, null)
                )
              )
            ),
            o.a.createElement(le.a, { style: $e.title }, "Add New Destination"),
            o.a.createElement(
              ie.a,
              { style: $e.body },
              o.a.createElement(ce.a, null, d),
              o.a.createElement(se.a, {
                id: "venue-name",
                label: "Venue name",
                value: c.name,
                onChange: g("name"),
                margin: "normal",
                style: $e.input
              }),
              o.a.createElement("br", null),
              o.a.createElement(Ne, {
                onVenueTypeSelected: function(e) {
                  console.log("venueTypeId selected:", e),
                    s(Object(a.a)({}, c, { type: { id: e } }));
                }
              }),
              o.a.createElement("br", null),
              o.a.createElement(se.a, {
                id: "venue-street-address",
                name: "street-address",
                label: "Street address",
                value: c.streetAddress,
                onChange: g("streetAddress"),
                margin: "normal",
                autoComplete: "shipping street-address",
                style: $e.input
              }),
              o.a.createElement(xe, {
                onCitySelected: function(e) {
                  console.log("city selected:", e),
                    s(Object(a.a)({}, c, { city: { id: e.value } }));
                }
              }),
              o.a.createElement(ue.a, {
                customInput: se.a,
                id: "venue-zipcode",
                name: "zipcode",
                label: "Zipcode",
                value: c.zipcode,
                onChange: g("zipcode"),
                margin: "normal",
                style: $e.input,
                autoComplete: "postal-code",
                format: "#####"
              }),
              o.a.createElement(
                "div",
                null,
                o.a.createElement(
                  A.a,
                  {
                    color: "primary",
                    onClick: function() {
                      !(function(e) {
                        var t = e.name,
                          n = e.type,
                          a = e.streetAddress,
                          r = e.city,
                          o = e.zipcode,
                          i = {
                            name: !1,
                            type: !1,
                            streetAddress: !1,
                            city: !1,
                            zipcode: !1
                          };
                        return (
                          t && t.length >= 2 && (i.name = !0),
                          n && n.id && (i.type = !0),
                          a && a.length >= 2 && (i.streetAddress = !0),
                          r && r.id && (i.city = !0),
                          o && !isNaN(parseInt(o)) && (i.zipcode = !0),
                          -1 === Object.values(i).indexOf(!1)
                        );
                      })(c)
                        ? p("Please enter valid venue information")
                        : n({
                            variables: {
                              name: c.name,
                              typeId: c.type.id,
                              streetAddress: c.streetAddress,
                              zipcode: parseInt(c.zipcode),
                              cityId: c.city.id
                            }
                          }).then(function(t) {
                            console.log("response", t),
                              s(Object(a.a)({}, De)),
                              e.toggleDialog();
                          });
                    }
                  },
                  "Create venue"
                )
              )
            )
          );
        },
        Me = n(133),
        Ae = n.n(Me),
        qe = n(245),
        ze = n(242),
        Ve = Object(Z.a)({
          appBar: { boxShadow: "none", float: "left", width: "300px" },
          tabIndicator: { backgroundColor: "#ffffff" }
        })(function(e) {
          var t = e.classes,
            n = e.venues,
            a = e.venueTypeFilter,
            r = e.onSetVenueTypeFilter;
          return o.a.createElement(
            o.a.Fragment,
            null,
            o.a.createElement(
              Ae.a,
              { position: "static", className: t.appBar },
              o.a.createElement(
                qe.a,
                {
                  value: a,
                  onChange: function(e, t) {
                    r(t);
                  },
                  classes: { indicator: t.tabIndicator },
                  orientation: "vertical",
                  variant: "scrollable",
                  scrollButtons: "auto"
                },
                o.a.createElement(ze.a, { label: "all", value: "all" }),
                (function(e) {
                  for (var t = {}, n = 0; n < e.length; n++)
                    e[n].venueTypes &&
                      e[n].venueTypes.length &&
                      (t[e[n].venueTypes[0].name]
                        ? t[e[n].venueTypes[0].name].venues.push(e[n])
                        : (t[e[n].venueTypes[0].name] = {
                            type: {
                              id: e[n].venueTypes[0].id,
                              name: e[n].venueTypes[0].name
                            },
                            venues: [e[n]]
                          }));
                  return Object.keys(t);
                })(n)
                  .sort()
                  .map(function(e, t) {
                    return o.a.createElement(ze.a, {
                      label: e,
                      value: e,
                      key: t
                    });
                  })
              )
            )
          );
        }),
        We = {
          sectionHeader: { marginBottom: "15px", display: "flex" },
          sectionHeaderTitle: { flexGrow: 2 },
          venueList: { marginLeft: "320px" }
        },
        Le = function() {
          var e = Object(r.useState)(!1),
            t = Object(B.a)(e, 2),
            n = t[0],
            a = t[1],
            i = Object(r.useState)("all"),
            l = Object(B.a)(i, 2),
            c = l[0],
            s = l[1],
            u = function() {
              a(!n);
            };
          return o.a.createElement(M.b, { query: R }, function(e) {
            var t = e.loading,
              a = e.error,
              r = e.data;
            if (t) return "Loading...";
            if (a) return "Error! ".concat(a.message);
            var i = r.me.venues.sort(function(e, t) {
              return e.name > t.name ? 1 : t.name > e.name ? -1 : 0;
            });
            return o.a.createElement(
              "div",
              { className: "mainContainer" },
              o.a.createElement(
                "div",
                { className: "mainContent" },
                o.a.createElement(
                  "div",
                  { style: We.sectionHeader },
                  o.a.createElement(
                    x.a,
                    { variant: "h5", style: We.sectionHeaderTitle },
                    "My destinations"
                  ),
                  o.a.createElement(
                    A.a,
                    { variant: "outlined", onClick: u },
                    o.a.createElement(q.a, null),
                    "Add Destination"
                  ),
                  o.a.createElement(Be, { open: n, toggleDialog: u })
                ),
                o.a.createElement(Ve, {
                  venues: i,
                  onSetVenueTypeFilter: s,
                  venueTypeFilter: c
                }),
                o.a.createElement(
                  "div",
                  { style: We.venueList },
                  i
                    .filter(function(e) {
                      return "all" === c || e.venueTypes[0].name === c;
                    })
                    .map(function(e) {
                      return o.a.createElement(ae, { key: e.id, venue: e });
                    })
                )
              )
            );
          });
        },
        Ue = function(e) {
          var t = e.venue,
            n = C(
              (function(e) {
                return e.venueTypes[0].image || "restaurant-header-cmp.jpg";
              })(t),
              "300px"
            );
          return o.a.createElement(
            "div",
            { style: n.container },
            o.a.createElement(
              x.a,
              { variant: "h2", style: n.headerText },
              o.a.createElement("strong", null, t.name)
            )
          );
        },
        _e = Object(be.b)(function(e) {
          var t = e.client,
            n = e.venue,
            a = Object(r.useState)([]),
            i = Object(B.a)(a, 2),
            l = i[0],
            c = i[1];
          return (
            Object(r.useEffect)(
              function() {
                t.query({
                  query: K,
                  variables: { venueId: n.id, limit: 5, radius: 10 }
                }).then(function(e) {
                  var t = e.data;
                  c(t.similarVenues);
                });
              },
              [n, t]
            ),
            o.a.createElement(
              "div",
              null,
              o.a.createElement("h3", null, "Similar places near by"),
              o.a.createElement(
                "div",
                null,
                l &&
                  l.map(function(e) {
                    return o.a.createElement("div", { key: e.id }, e.name);
                  })
              )
            )
          );
        }),
        Fe = {
          sectionHeader: { marginBottom: "15px" },
          columnWrapper: { display: "flex" },
          mainColumn: { flexGrow: 3 },
          sideColumm: { flexGrow: 1 }
        },
        He = function(e) {
          var t = e.match.params.venueSlug;
          return t
            ? o.a.createElement(
                M.b,
                { query: J, variables: { venueSlug: t } },
                function(e) {
                  var t = e.loading,
                    n = e.error,
                    a = e.data;
                  if (t) return "Loading...";
                  if (n) return "Error! ".concat(n.message);
                  var r = a.venueBySlug;
                  return (
                    console.log("data", a),
                    o.a.createElement(
                      "div",
                      null,
                      o.a.createElement(Ue, { venue: r }),
                      o.a.createElement(
                        "div",
                        { className: "mainContainer" },
                        o.a.createElement(
                          "div",
                          { className: "mainContent" },
                          o.a.createElement(
                            x.a,
                            { variant: "h5", style: Fe.sectionHeader },
                            r.name
                          ),
                          o.a.createElement(
                            "div",
                            { style: Fe.columnWrapper },
                            o.a.createElement(
                              "div",
                              { style: Fe.mainColumn },
                              "main"
                            ),
                            o.a.createElement(
                              "div",
                              { style: Fe.sideColumm },
                              o.a.createElement(_e, { venue: r })
                            )
                          )
                        )
                      )
                    )
                  );
                }
              )
            : o.a.createElement("div", null, "Venue not found.");
        },
        Ge = n(249),
        Pe = n(241),
        Je = n(138),
        Re = n(102),
        Qe = n.n(Re),
        Ke = Object(Je.a)({
          palette: {
            primary: { main: Qe.a[500] },
            background: { default: "#ffffff" }
          },
          typography: { useNextVariants: !0 }
        }),
        Ze = n(74),
        Xe = n.n(Ze),
        Ye = n(135),
        et = n.n(Ye),
        tt = n(139),
        nt = n(142);
      function at() {
        var e = Object(z.a)([
          "\n\tquery {\n\t\t\tcurrentUser @client {\n\t\t\t\t\tid\n\t\t\t\t\tfirstName\n\t\t\t\t\tlastName\n\t\t\t}\n\t}\n"
        ]);
        return (
          (at = function() {
            return e;
          }),
          e
        );
      }
      var rt = W()(at()),
        ot = function() {
          return !!localStorage.getItem("auth-token");
        },
        it = function(e, t) {
          localStorage.setItem("auth-token", e),
            localStorage.setItem("user-info", JSON.stringify(t));
        },
        lt = n(94),
        ct = n.n(lt);
      function st() {
        var e = Object(z.a)([
          "\n    mutation LoginMutation($email: String!, $password: String!) {\n        login(email: $email, password: $password) {\n            token,\n            user {\n                id,\n                firstName,\n                lastName,\n                email\n            }\n        }\n    }\n"
        ]);
        return (
          (st = function() {
            return e;
          }),
          e
        );
      }
      function ut() {
        var e = Object(z.a)([
          "\n    mutation SignupMutation($email: String!, $password: String!, $firstName: String!, $lastName: String!) {\n        signup(email: $email, password: $password, firstName: $firstName, lastName: $lastName) {\n            token,\n            user {\n                id,\n                firstName,\n                lastName,\n                email\n            }\n        }\n    }\n"
        ]);
        return (
          (ut = function() {
            return e;
          }),
          e
        );
      }
      var mt,
        dt = W()(ut()),
        pt = W()(st()),
        gt = n(244),
        ft = (function(e) {
          function t() {
            var e, n;
            Object(f.a)(this, t);
            for (var r = arguments.length, o = new Array(r), i = 0; i < r; i++)
              o[i] = arguments[i];
            return (
              ((n = Object(h.a)(
                this,
                (e = Object(y.a)(t)).call.apply(e, [this].concat(o))
              )).state = {
                login: !0,
                email: "",
                password: "",
                firstName: "",
                lastName: "",
                errorMessage: null
              }),
              (n._update = function(e, t) {
                return ct.a.async(function(n) {
                  for (;;)
                    switch ((n.prev = n.next)) {
                      case 0:
                        e.writeData({
                          data: {
                            currentUser: Object(a.a)({}, t.user, {
                              token: t.token
                            })
                          }
                        });
                      case 1:
                      case "end":
                        return n.stop();
                    }
                });
              }),
              (n._confirm = function(e) {
                var t, a, r;
                return ct.a.async(function(o) {
                  for (;;)
                    switch ((o.prev = o.next)) {
                      case 0:
                        (n.state.error = null),
                          (t = n.state.login ? e.login : e.signup),
                          (a = t.token),
                          (r = t.user),
                          n._saveUserData(a, r),
                          (document.location = O.dashboard);
                      case 4:
                      case "end":
                        return o.stop();
                    }
                });
              }),
              (n._saveUserData = function(e, t) {
                it(e, t);
              }),
              (n._error = function(e) {
                var t;
                return ct.a.async(function(a) {
                  for (;;)
                    switch ((a.prev = a.next)) {
                      case 0:
                        (t = e.graphQLErrors),
                          n.state.login && t && t[0] && t[0].message
                            ? n.setState({ errorMessage: t[0].message })
                            : t &&
                              t[0] &&
                              t[0].extensions.exception.errors[0].message &&
                              n.setState({
                                errorMessage:
                                  t[0].extensions.exception.errors[0].message
                              });
                      case 2:
                      case "end":
                        return a.stop();
                    }
                });
              }),
              n
            );
          }
          return (
            Object(b.a)(t, e),
            Object(v.a)(t, [
              {
                key: "componentDidUpdate",
                value: function(e) {
                  e.open !== this.props.open &&
                    this.setState({ errorMessage: null });
                }
              },
              {
                key: "render",
                value: function() {
                  var e = this,
                    t = this.state,
                    n = t.login,
                    a = t.email,
                    r = t.password,
                    i = t.firstName,
                    l = t.lastName,
                    c = t.errorMessage,
                    s = this.props.classes;
                  return o.a.createElement(
                    oe.a,
                    {
                      open: this.props.open,
                      onClose: this.props.toggleDialog,
                      maxWidth: "sm",
                      fullWidth: !0,
                      "aria-labelledby": "form-dialog-title"
                    },
                    o.a.createElement(
                      le.a,
                      { id: "login-dialog-title" },
                      n ? "Login" : "Sign Up"
                    ),
                    o.a.createElement(
                      ie.a,
                      null,
                      c &&
                        o.a.createElement(
                          ce.a,
                          { className: s.dialogMainError },
                          c
                        ),
                      o.a.createElement(
                        "div",
                        { className: s.dialogMainContent },
                        !n &&
                          o.a.createElement(
                            "span",
                            null,
                            o.a.createElement(se.a, {
                              id: "firstName",
                              label: "First name",
                              error: !!c,
                              value: i,
                              onChange: function(t) {
                                return e.setState({
                                  firstName: t.target.value
                                });
                              },
                              margin: "normal",
                              fullWidth: !0
                            }),
                            o.a.createElement(se.a, {
                              id: "lastName",
                              label: "Last name",
                              error: !!c,
                              value: l,
                              onChange: function(t) {
                                return e.setState({ lastName: t.target.value });
                              },
                              margin: "normal",
                              fullWidth: !0
                            })
                          ),
                        o.a.createElement(se.a, {
                          id: "email",
                          label: "Email",
                          error: !!c,
                          value: a,
                          onChange: function(t) {
                            return e.setState({ email: t.target.value });
                          },
                          margin: "normal",
                          fullWidth: !0
                        }),
                        o.a.createElement(se.a, {
                          id: "password",
                          label: "Password",
                          error: !!c,
                          type: "password",
                          autoComplete: "current-password",
                          onChange: function(t) {
                            return e.setState({ password: t.target.value });
                          },
                          margin: "normal",
                          fullWidth: !0
                        })
                      )
                    ),
                    o.a.createElement(
                      gt.a,
                      null,
                      o.a.createElement(
                        A.a,
                        {
                          onClick: function() {
                            return e.setState({
                              login: !n,
                              errorMessage: null
                            });
                          },
                          color: "primary",
                          style: { marginRight: "auto" }
                        },
                        n
                          ? "need to create an account?"
                          : "already have an account?"
                      ),
                      o.a.createElement(
                        A.a,
                        { onClick: this.props.toggleDialog, color: "primary" },
                        "Cancel"
                      ),
                      o.a.createElement(
                        M.a,
                        {
                          mutation: n ? pt : dt,
                          variables: {
                            email: a,
                            password: r,
                            firstName: i,
                            lastName: l
                          },
                          update: function(t, a) {
                            var r = a.data;
                            return e._update(t, n ? r.login : r.signup);
                          },
                          onCompleted: function(t) {
                            return e._confirm(t);
                          },
                          onError: function(t) {
                            return e._error(t);
                          }
                        },
                        function(e) {
                          return o.a.createElement(
                            A.a,
                            { color: "primary", onClick: e },
                            n ? "login" : "create account"
                          );
                        }
                      )
                    )
                  );
                }
              }
            ]),
            t
          );
        })(r.Component),
        vt = Object(E.f)(
          Object(Z.a)({
            dialogMainContent: {
              display: "flex",
              justifyContent: "center",
              flexDirection: "column"
            },
            dialogMainError: { textAlign: "center" }
          })(ft)
        ),
        ht = (function(e) {
          function t() {
            var e, n;
            Object(f.a)(this, t);
            for (var a = arguments.length, r = new Array(a), o = 0; o < a; o++)
              r[o] = arguments[o];
            return (
              ((n = Object(h.a)(
                this,
                (e = Object(y.a)(t)).call.apply(e, [this].concat(r))
              )).state = { dialogOpen: !1 }),
              (n.toggleDialog = function() {
                n.setState({ dialogOpen: !n.state.dialogOpen });
              }),
              (n.renderUserInfo = function(e) {
                return e && e.id ? "Welcome, ".concat(e.firstName) : "";
              }),
              n
            );
          }
          return (
            Object(b.a)(t, e),
            Object(v.a)(t, [
              {
                key: "render",
                value: function() {
                  var e = this.props.currentUser;
                  return ot()
                    ? o.a.createElement(
                        x.a,
                        {
                          variant: "button",
                          color: "inherit",
                          className: this.props.className
                        },
                        this.renderUserInfo(e)
                      )
                    : o.a.createElement(
                        "span",
                        null,
                        o.a.createElement(
                          A.a,
                          {
                            onClick: this.toggleDialog,
                            className: this.props.className,
                            color: "inherit"
                          },
                          "Login"
                        ),
                        o.a.createElement(vt, {
                          open: this.state.dialogOpen,
                          toggleDialog: this.toggleDialog
                        })
                      );
                }
              }
            ]),
            t
          );
        })(r.Component),
        yt =
          ((mt = Object(E.f)(ht)),
          Object(nt.a)(
            Object(be.a)(rt, {
              props: function(e) {
                return { currentUser: e.data.currentUser };
              }
            })
          )(mt)),
        bt = (function(e) {
          function t() {
            var e, n;
            Object(f.a)(this, t);
            for (var a = arguments.length, r = new Array(a), o = 0; o < a; o++)
              r[o] = arguments[o];
            return (
              ((n = Object(h.a)(
                this,
                (e = Object(y.a)(t)).call.apply(e, [this].concat(r))
              )).state = { anchorEl: null }),
              (n.toggleMenu = function(e) {
                n.state.anchorEl
                  ? n.setState({ anchorEl: null })
                  : n.setState({ anchorEl: e.currentTarget });
              }),
              n
            );
          }
          return (
            Object(b.a)(t, e),
            Object(v.a)(t, [
              {
                key: "render",
                value: function() {
                  var e = this,
                    t = this.props.classes;
                  return o.a.createElement(
                    "div",
                    { className: t.root },
                    o.a.createElement(
                      me.a,
                      {
                        position: "fixed",
                        style: { background: "transparent", boxShadow: "none" }
                      },
                      o.a.createElement(
                        de.a,
                        { variant: "dense", className: t.container },
                        o.a.createElement(
                          x.a,
                          {
                            className: t.logoText,
                            variant: "button",
                            color: "inherit"
                          },
                          "KidTrip"
                        ),
                        o.a.createElement(x.a, {
                          variant: "h6",
                          color: "inherit",
                          className: t.grow
                        }),
                        o.a.createElement(yt, { className: t.loginButton }),
                        ot() &&
                          o.a.createElement(
                            "span",
                            { className: t.menuWrapper },
                            o.a.createElement(
                              fe.a,
                              {
                                onClick: this.toggleMenu,
                                className: t.menuButton,
                                color: "inherit",
                                "aria-label": "Menu"
                              },
                              o.a.createElement(et.a, null)
                            ),
                            o.a.createElement(
                              tt.a,
                              {
                                id: "simple-menu",
                                anchorEl: this.state.anchorEl,
                                open: Boolean(this.state.anchorEl),
                                onClose: this.toggleMenu
                              },
                              o.a.createElement(
                                we.a,
                                {
                                  component: ne.b,
                                  to: O.home,
                                  onClick: this.toggleMenu
                                },
                                "Home"
                              ),
                              o.a.createElement(
                                we.a,
                                {
                                  component: ne.b,
                                  to: O.dashboard,
                                  onClick: this.toggleMenu
                                },
                                "Dashboard"
                              ),
                              o.a.createElement(
                                we.a,
                                { onClick: this.toggleMenu },
                                "My account"
                              ),
                              o.a.createElement(
                                we.a,
                                {
                                  onClick: function() {
                                    localStorage.removeItem("auth-token"),
                                      localStorage.removeItem("user-info"),
                                      e.props.history.push("/");
                                  }
                                },
                                "Logout"
                              )
                            )
                          )
                      )
                    )
                  );
                }
              }
            ]),
            t
          );
        })(r.Component),
        Et = Object(E.f)(bt),
        Ot = {
          root: { flexGrow: 1 },
          grow: { flexGrow: 1 },
          menuButton: { marginLeft: -12, marginRight: 20 },
          menuWrapper: { marginLeft: 15 }
        },
        jt = Object(a.a)({}, Ot, {
          container: {
            borderBottom: "1px solid",
            borderBottomColor: Xe.a[100],
            backgroundColor: "white"
          },
          grow: Object(a.a)({}, Ot.grow, { color: Xe.a[500] }),
          menuButton: Object(a.a)({}, Ot.menuButton, { color: Xe.a[500] }),
          loginButton: { color: Xe.a[500] },
          logoText: { color: Xe.a[500] }
        }),
        xt = Object(E.f)(function(e) {
          var t = j(e.location) ? Ot : jt,
            n = Object(Z.a)(t)(Et);
          return o.a.createElement(n, null);
        }),
        Ct = (function(e) {
          function t() {
            return (
              Object(f.a)(this, t),
              Object(h.a)(this, Object(y.a)(t).apply(this, arguments))
            );
          }
          return (
            Object(b.a)(t, e),
            Object(v.a)(t, [
              {
                key: "render",
                value: function() {
                  var e = this.props,
                    t = e.classes,
                    n = e.location;
                  return o.a.createElement(
                    Pe.a,
                    { theme: Ke },
                    o.a.createElement(
                      "div",
                      null,
                      o.a.createElement(Ge.a, null),
                      o.a.createElement(xt, null),
                      !j(n) &&
                        o.a.createElement("div", { className: t.appBarSpacer }),
                      o.a.createElement(
                        E.c,
                        null,
                        o.a.createElement(E.a, {
                          exact: !0,
                          path: O.home,
                          component: D
                        }),
                        o.a.createElement(E.a, {
                          exact: !0,
                          path: O.dashboard,
                          component: Le
                        }),
                        o.a.createElement(E.a, { path: O.venue, component: He })
                      )
                    )
                  );
                }
              }
            ]),
            t
          );
        })(r.Component),
        wt = Object(E.f)(
          Object(Z.a)({
            "@global": {
              body: { fontFamily: "Roboto, Helvetica, Arial, sans-serif" },
              ".mainContainer": { display: "flex", justifyContent: "center" },
              ".mainContent": {
                maxWidth: "1200px",
                flexGrow: "1",
                margin: "50px"
              }
            },
            appBarSpacer: { height: "49px" }
          })(Ct)
        );
      Boolean(
        "localhost" === window.location.hostname ||
          "[::1]" === window.location.hostname ||
          window.location.hostname.match(
            /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
          )
      );
      n(199);
      var St = new s.a(),
        Nt = {
          currentUser: Object(a.a)(
            {},
            (function() {
              var e = localStorage.getItem("user-info");
              return e
                ? JSON.parse(e)
                : {
                    __typename: "User",
                    id: null,
                    firstName: null,
                    lastName: null,
                    email: null
                  };
            })()
          )
        },
        kt = Object(g.a)({
          cache: St,
          defaults: Nt,
          resolvers: {
            Mutation: {
              updateUserInfo: function(e, t, n) {
                var a = {
                  user: {
                    __typename: "User",
                    id: t.id,
                    firstName: t.firstName,
                    lastName: t.lastName,
                    email: t.email
                  }
                };
                return n.cache.writeData({ data: a }), null;
              }
            }
          }
        }),
        It = localStorage.getItem("auth-token"),
        Tt = new u.a({
          uri: "http://api.mykidtrip.com",
          credentials: "same-origin",
          headers: { authorization: It ? "Bearer ".concat(It) : "" }
        }),
        $t = new c.a({
          link: d.a.from([
            Object(m.a)(function(e) {
              var t = e.graphQLErrors,
                n = e.networkError;
              t &&
                t.map(function(e) {
                  var t = e.message,
                    n = e.locations,
                    a = e.path;
                  return console.log(
                    "[GraphQL error]: Message: "
                      .concat(t, ", Location: ")
                      .concat(n, ", Path: ")
                      .concat(a)
                  );
                }),
                n && console.log("[Network error]: ".concat(n));
            }),
            kt,
            Tt
          ]),
          cache: new s.a(),
          resolvers: {}
        });
      l.a.render(
        o.a.createElement(
          ne.a,
          null,
          o.a.createElement(p.b, { client: $t }, o.a.createElement(wt, null))
        ),
        document.getElementById("root")
      ),
        "serviceWorker" in navigator &&
          navigator.serviceWorker.ready.then(function(e) {
            e.unregister();
          });
    }
  },
  [[162, 1, 2]]
]);
//# sourceMappingURL=main.80790cee.chunk.js.map
