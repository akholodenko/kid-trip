;(this.webpackJsonpclient = this.webpackJsonpclient || []).push([
  [0],
  {
    131: function(e, t, n) {},
    221: function(e, t, n) {},
    222: function(e, t, n) {},
    223: function(e, t, n) {},
    224: function(e, t, n) {},
    225: function(e, t, n) {},
    251: function(e, t, n) {},
    253: function(e, t, n) {},
    254: function(e, t, n) {},
    255: function(e, t, n) {},
    256: function(e, t, n) {},
    257: function(e, t, n) {},
    259: function(e, t, n) {
      'use strict'
      n.r(t)
      var a = n(11),
        r = n(0),
        o = n.n(r),
        i = n(18),
        l = n.n(i),
        c = n(7),
        s = n(44),
        u = n(177),
        m = n(15),
        d = function(e) {
          return e.pathname === p.home
        },
        f = function(e) {
          return btoa(999999999 * e)
        }
      var p = {
          home: '/',
          dashboard: '/dashboard/:section?',
          dashboardPath: e => '/dashboard/'.concat(e),
          venue: '/venue/:venueSlug',
          venuePath: e => '/venue/'.concat(e),
          messages: '/messages/:publicId?',
          messagesPath: e => '/messages/'.concat(e ? f(e) : ''),
          userProfile: '/user/:userId',
          userProfilePath: e => '/user/'.concat(f(e)),
          validatePageSection: (e, t, n) =>
            Object.values(t).includes(e) ? e : n
        },
        v = n(192),
        b = function(e, t) {
          return {
            container: {
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              background: 'linear-gradient(rgba(0, 0, 0, 0.5),rgba(0, 0, 0, 0.5)),url('.concat(
                e,
                ') 50% 50% no-repeat'
              ),
              backgroundSize: 'cover',
              height: t
            },
            headerText: { color: '#ffffff' }
          }
        },
        g = b(
          ''.concat(
            'https://kidtrip.s3.us-east-2.amazonaws.com/assets/',
            'venue-header-backgrounds/family-biking-cmp.jpg'
          ),
          '700px'
        ),
        y = function() {
          return o.a.createElement(
            'div',
            { style: g.container },
            o.a.createElement(
              v.a,
              { variant: 'h2', style: g.headerText },
              o.a.createElement('strong', null, 'Experience'),
              ' childhood, again.'
            )
          )
        },
        E =
          (n(221),
          function(e) {
            var t = e.title,
              n = e.icon,
              a = e.text,
              r = {
                background: 'url(/images/icons/'.concat(
                  n,
                  '.png) 0% 0% / 60px 60px no-repeat'
                ),
                width: '60px',
                height: '60px'
              }
            return o.a.createElement(
              'div',
              { className: 'value-prop-section' },
              o.a.createElement('div', { className: 'value-prop-title' }, t),
              o.a.createElement('div', {
                className: 'value-prop-icon',
                style: r
              }),
              o.a.createElement('div', { className: 'value-prop-text' }, a)
            )
          }),
        h =
          (n(222),
          {
            title: 'Discover',
            icon: 'discover',
            text:
              'Find out about great local places to visit with your family. From restaurants, to museums, \n\tparks and playgrounds, make the most of your time!'
          }),
        O = {
          title: 'Track',
          icon: 'track',
          text:
            'Had a great time sharing a meal with your family or enjoyed a hiking trail? Jot it down to build your \n\troster of go-to places for your future trips.'
        },
        j = {
          title: 'Share',
          icon: 'share',
          text:
            'Share your favorite places to visit with friends and family; hear about what others are \n\tenjoying, for great new ideas.'
        },
        N = function() {
          return o.a.createElement(
            'div',
            { className: 'value-prop-container' },
            o.a.createElement(E, h),
            o.a.createElement(E, O),
            o.a.createElement(E, j)
          )
        },
        I = 'auth-token',
        S = 'user-info',
        C = n(181),
        x = n(191),
        w = n(14)
      function k() {
        var e = Object(w.a)([
          '\n  query($cityIds: String, $venueTypeIds: String, $sort: String, $first: Int) {\n    venues(\n      cityIds: $cityIds\n      venueTypeIds: $venueTypeIds\n      sort: $sort\n      first: $first\n    ) {\n      id\n      createdAt\n      name\n      slug\n      description\n      streetAddress\n      zipcode\n      city\n      state\n      lat\n      lng\n      creator {\n        id\n        firstName\n        lastName\n      }\n      venueTypes {\n        id\n        name\n        image\n      }\n    }\n  }\n'
        ])
        return (
          (k = function() {
            return e
          }),
          e
        )
      }
      function T() {
        var e = Object(w.a)([
          '\n  query($name: String!, $cityId: Int, $limit: Int) {\n    similarVenuesByName(name: $name, cityId: $cityId, first: $limit) {\n      id\n      name\n      slug\n      streetAddress\n      zipcode\n      city\n      state\n      venueTypes {\n        id\n        name\n      }\n    }\n  }\n'
        ])
        return (
          (T = function() {
            return e
          }),
          e
        )
      }
      function U() {
        var e = Object(w.a)([
          '\n  query($venueId: ID!, $limit: Int, $radius: Int) {\n    similarVenues(id: $venueId, first: $limit, radius: $radius) {\n      id\n      name\n      slug\n      streetAddress\n      zipcode\n      city\n    }\n  }\n'
        ])
        return (
          (U = function() {
            return e
          }),
          e
        )
      }
      function $() {
        var e = Object(w.a)([
          '\n  query {\n    venueTypes {\n      id\n      name\n      image\n    }\n  }\n'
        ])
        return (
          ($ = function() {
            return e
          }),
          e
        )
      }
      function q() {
        var e = Object(w.a)([
          '\n  query {\n    me {\n      id\n      venues {\n        ...VenueDetails\n      }\n      favoriteVenues {\n        ...VenueDetails\n      }\n    }\n  }\n  ',
          '\n'
        ])
        return (
          (q = function() {
            return e
          }),
          e
        )
      }
      function V() {
        var e = Object(w.a)([
          '\n  query($venueSlug: String!) {\n    venueBySlug(slug: $venueSlug) {\n      ...VenueDetails\n      ...VenueStats\n    }\n  }\n  ',
          '\n  ',
          '\n'
        ])
        return (
          (V = function() {
            return e
          }),
          e
        )
      }
      function F() {
        var e = Object(w.a)([
          '\n  query($venueId: ID!) {\n    venue(id: $venueId) {\n      ...VenueDetails\n      ...VenueStats\n    }\n  }\n  ',
          '\n  ',
          '\n'
        ])
        return (
          (F = function() {
            return e
          }),
          e
        )
      }
      function B() {
        var e = Object(w.a)([
          '\n  query($venueId: ID!) {\n    venue(id: $venueId) {\n      ...VenueDetails\n    }\n  }\n  ',
          '\n'
        ])
        return (
          (B = function() {
            return e
          }),
          e
        )
      }
      function D() {
        var e = Object(w.a)([
          '\n  fragment VenueStats on Venue {\n    venueStats {\n      favorites\n      favoriteByCurrentUser\n    }\n  }\n'
        ])
        return (
          (D = function() {
            return e
          }),
          e
        )
      }
      function A() {
        var e = Object(w.a)([
          '\n  fragment VenueDetails on Venue {\n    id\n    name\n    slug\n    description\n    streetAddress\n    zipcode\n    city\n    state\n    lat\n    lng\n    venueTypes {\n      id\n      name\n      image\n    }\n  }\n'
        ])
        return (
          (A = function() {
            return e
          }),
          e
        )
      }
      var M = Object(c.gql)(A()),
        P = Object(c.gql)(D()),
        L =
          (Object(c.gql)(B(), M),
          Object(c.gql)(F(), M, P),
          Object(c.gql)(V(), M, P)),
        W = Object(c.gql)(q(), M),
        z = Object(c.gql)($()),
        R = Object(c.gql)(U()),
        Q = Object(c.gql)(T()),
        _ = Object(c.gql)(k())
      function H() {
        const e = Object(w.a)([
          '\n  query {\n    me {\n      id\n      stats {\n        followers\n        followees\n      }\n      followees {\n        id\n        publicId\n        firstName\n        lastName\n      }\n      followers {\n        id\n        publicId\n        firstName\n        lastName\n      }\n    }\n  }\n'
        ])
        return (
          (H = function() {
            return e
          }),
          e
        )
      }
      function G() {
        const e = Object(w.a)([
          '\n  query($publicId: String!) {\n    userProfile(publicId: $publicId) {\n      publicId\n      user {\n        id\n        firstName\n        lastName\n        zipcode\n      }\n      config {\n        headerImageUrl\n      }\n      stats {\n        created\n        favorited\n        followedByCurrentUser\n        followsCurrentUser\n        followers\n        followees\n      }\n      recentFavoriteVenues {\n        ...VenueDetails\n      }\n      recentAddedVenues {\n        ...VenueDetails\n      }\n    }\n  }\n  ',
          '\n'
        ])
        return (
          (G = function() {
            return e
          }),
          e
        )
      }
      function J() {
        const e = Object(w.a)([
          '\n  query {\n    userFeedConfig {\n      cityIds\n      venueTypeIds\n      cityDetails {\n        id\n        name\n        state\n      }\n    }\n  }\n'
        ])
        return (
          (J = function() {
            return e
          }),
          e
        )
      }
      function Y() {
        const e = Object(w.a)([
          '\n  query {\n    currentUser @client {\n      id\n      firstName\n      lastName\n    }\n  }\n'
        ])
        return (
          (Y = function() {
            return e
          }),
          e
        )
      }
      const K = Object(c.gql)(Y()),
        Z = Object(c.gql)(J()),
        X = Object(c.gql)(G(), M),
        ee = Object(c.gql)(H()),
        te = () => !!localStorage.getItem(I),
        ne = (e, t) => {
          localStorage.setItem(I, e), localStorage.setItem(S, JSON.stringify(t))
        },
        ae = e =>
          Object(x.a)(
            Object(C.graphql)(K, {
              props: ({ data: { currentUser: e } }) => ({ currentUser: e })
            })
          )(e),
        re = e =>
          e && e.firstName && e.lastName
            ? ''.concat(e.firstName, ' ').concat(e.lastName[0], '.')
            : ''
      n(223), n(224)
      var oe = function() {
          return o.a.createElement(
            'div',
            null,
            !te() &&
              o.a.createElement(
                'div',
                null,
                o.a.createElement(
                  'button',
                  {
                    className: 'form-button homepage-signup-button',
                    onClick: function() {
                      return (() => {
                        const e = new Event('openSignUpModal')
                        window.dispatchEvent(e)
                      })()
                    }
                  },
                  'Get Started'
                )
              )
          )
        },
        ie = function() {
          return o.a.createElement(
            'div',
            null,
            o.a.createElement(y, null),
            o.a.createElement(N, null),
            o.a.createElement(oe, null)
          )
        },
        le = n(10),
        ce = n(9),
        se = n(22),
        ue = n(303),
        me = n(306),
        de = n(313),
        fe = n(301),
        pe = n(300),
        ve = n(302),
        be = n(314),
        ge = n(114),
        ye = n(297),
        Ee = n(298),
        he = n(184),
        Oe = n.n(he),
        je = n(299),
        Ne = n(120)
      function Ie() {
        var e = Object(w.a)([
          '\n  query($limit: Int, $query: String) {\n    cities(first: $limit, query: $query) {\n      id\n      name\n      state\n    }\n  }\n'
        ])
        return (
          (Ie = function() {
            return e
          }),
          e
        )
      }
      var Se = Object(c.gql)(Ie()),
        Ce = n(315),
        xe = n(286),
        we = {
          container: { position: 'relative', width: '500px' },
          formControl: {
            minWidth: '500px',
            marginTop: '16px',
            marginBottom: '8px',
            height: '16px'
          }
        },
        ke = function(e) {
          var t = e.onCitySelected,
            n = e.isMulti,
            i = e.fieldLabel,
            l = e.placeholder,
            s = e.containerWidth,
            u = e.containerDisplay,
            m = e.initialValue,
            d = Object(c.useApolloClient)(),
            f = Object(r.useState)(''),
            p = Object(le.a)(f, 2),
            v = p[0],
            b = p[1],
            g = Object(r.useState)(n ? [] : {}),
            y = Object(le.a)(g, 2),
            E = y[0],
            h = y[1],
            O = Object(r.useState)([]),
            j = Object(le.a)(O, 2),
            N = j[0],
            I = j[1]
          Object(r.useEffect)(
            function() {
              v && v.length >= 3
                ? (function(e) {
                    return d.query({
                      query: Se,
                      variables: { limit: 10, query: e }
                    })
                  })(v).then(function(e) {
                    var t = e.data
                    I(
                      t.cities.map(function(e) {
                        return {
                          value: e.id,
                          label: ''.concat(e.name, ', ').concat(e.state)
                        }
                      })
                    )
                  })
                : I([])
            },
            [v, d]
          ),
            Object(r.useEffect)(
              function() {
                m &&
                  Array.isArray(m) &&
                  m.length &&
                  h(
                    m.map(function(e) {
                      return {
                        value: e.id,
                        label: ''.concat(e.name, ', ').concat(e.state)
                      }
                    })
                  )
              },
              [m]
            )
          return o.a.createElement(
            'div',
            {
              style: Object(a.a)(
                Object(a.a)({}, we.container),
                {},
                { width: s || '500px', display: u || 'block' }
              )
            },
            o.a.createElement(
              xe.a,
              { style: we.formControl },
              o.a.createElement(
                Ce.a,
                { shrink: !0, htmlFor: 'age-simple' },
                i || 'City'
              )
            ),
            o.a.createElement(Ne.a, {
              value: E,
              defaultValue: null,
              onChange: function(e) {
                h(e), t(e)
              },
              options: N,
              onInputChange: function(e) {
                b(e)
              },
              placeholder: l || 'Type in name of city',
              isClearable: !0,
              isMulti: !!n,
              menuIsOpen: N && N.length,
              escapeClearsValue: !0
            })
          )
        },
        Te = n(311),
        Ue = n(316),
        $e = {
          formControl: {
            minWidth: '500px',
            marginTop: '16px',
            marginBottom: '8px'
          }
        },
        qe = function(e) {
          var t = e.onVenueTypeSelected,
            n = Object(r.useState)(''),
            a = Object(le.a)(n, 2),
            i = a[0],
            l = a[1],
            s = Object(c.useQuery)(z),
            u = s.loading,
            m = s.error,
            d = s.data
          return u
            ? 'Loading...'
            : m
            ? 'Error! '.concat(m.message)
            : o.a.createElement(
                xe.a,
                { style: $e.formControl },
                o.a.createElement(
                  Ce.a,
                  { htmlFor: 'age-simple' },
                  'Venue Type'
                ),
                o.a.createElement(
                  Te.a,
                  {
                    value: i,
                    onChange: function(e) {
                      return (n = e.target.value), l(n), void t(n)
                      var n
                    },
                    inputProps: { name: 'type', id: 'venue-type' }
                  },
                  d.venueTypes.map(function(e) {
                    return o.a.createElement(
                      Ue.a,
                      { key: e.id, value: e.id },
                      e.name
                    )
                  })
                )
              )
        },
        Ve = n(289),
        Fe = n(290),
        Be = n(291),
        De = n(292),
        Ae = n(293),
        Me = n(294),
        Pe = n(295),
        Le = n(296),
        We = function(e) {
          var t = ''
            .concat(e.streetAddress, ', ')
            .concat(e.city, ', ')
            .concat(e.state, ' ')
            .concat(e.zipcode)
          return 'https://maps.google.com/?q='.concat(encodeURIComponent(t))
        },
        ze = function(e) {
          return e.venueTypes[0].name || 'venue'
        },
        Re = function(e) {
          return ''.concat(e.city, ', ').concat(e.state)
        },
        Qe = function(e) {
          var t =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : ', ',
            n =
              arguments.length > 2 && void 0 !== arguments[2]
                ? arguments[2]
                : ''
          return e
            ? 'raw' === n
              ? ''
                  .concat(e.streetAddress)
                  .concat(t)
                  .concat(Re(e), ' ')
                  .concat(e.zipcode)
              : o.a.createElement(
                  'span',
                  null,
                  e.streetAddress,
                  t,
                  Re(e),
                  ' ',
                  e.zipcode
                )
            : ''
        },
        _e = Object(r.createContext)({
          notifications: [],
          addNotification: function() {},
          clearNotifications: function() {}
        }),
        He = function(e) {
          var t = e.children,
            n = Object(r.useState)([]),
            a = Object(le.a)(n, 2),
            i = a[0],
            l = a[1],
            c = {
              notifications: i,
              addNotification: Object(r.useCallback)(
                function(e, t) {
                  return l(i.concat({ message: e, type: t }))
                },
                [i]
              ),
              clearNotifications: Object(r.useCallback)(function() {
                return l([])
              }, [])
            }
          return o.a.createElement(_e.Provider, { value: c }, t)
        },
        Ge = 1,
        Je = function() {
          var e = Object(r.useContext)(_e)
          return {
            notifications: e.notifications,
            addNotification: e.addNotification,
            clearNotifications: e.clearNotifications
          }
        }
      n(225)
      function Ye() {
        var e = Object(w.a)([
          '\n  mutation DeleteUserVenueFavorite($venueId: Int!) {\n    deleteUserVenueFavorite(venueId: $venueId) {\n      favorites\n      favoriteByCurrentUser\n    }\n  }\n'
        ])
        return (
          (Ye = function() {
            return e
          }),
          e
        )
      }
      function Ke() {
        var e = Object(w.a)([
          '\n  mutation CreateUserVenueFavorite($venueId: Int!) {\n    createUserVenueFavorite(venueId: $venueId) {\n      favorites\n      favoriteByCurrentUser\n    }\n  }\n'
        ])
        return (
          (Ke = function() {
            return e
          }),
          e
        )
      }
      function Ze() {
        var e = Object(w.a)([
          '\n  mutation CreateVenueMutation(\n    $name: String!\n    $streetAddress: String!\n    $zipcode: Int!\n    $cityId: Int!\n    $typeId: Int!\n  ) {\n    createVenue(\n      name: $name\n      streetAddress: $streetAddress\n      zipcode: $zipcode\n      city: { id: $cityId }\n      venueType: { id: $typeId }\n    ) {\n      id\n      name\n      streetAddress\n      venueTypes {\n        name\n      }\n    }\n  }\n'
        ])
        return (
          (Ze = function() {
            return e
          }),
          e
        )
      }
      var Xe = Object(c.gql)(Ze()),
        et = Object(c.gql)(Ke()),
        tt = Object(c.gql)(Ye()),
        nt = function(e, t, n) {
          if (
            e.data.data.ROOT_QUERY['venueBySlug({"slug":"'.concat(t, '"})')]
          ) {
            var r = e.readQuery({ query: L, variables: { venueSlug: t } })
            e.writeQuery({
              query: L,
              variables: { venueSlug: t },
              data: Object(a.a)(
                Object(a.a)({}, r),
                {},
                {
                  venueBySlug: Object(a.a)(
                    Object(a.a)({}, r.venueBySlug),
                    {},
                    { venueStats: Object(a.a)({}, n) }
                  )
                }
              )
            })
          }
        },
        at = function(e) {
          var t = e.venue,
            n = Object(m.f)(),
            a = Je().addNotification,
            i = Object(r.useState)(null),
            l = Object(le.a)(i, 2),
            s = l[0],
            u = l[1],
            d = Object(c.useLazyQuery)(Q),
            f = Object(le.a)(d, 2),
            v = f[0],
            b = f[1],
            g = [{ query: W }],
            y = Object(c.useMutation)(et, {
              onError(e) {
                console.log('error', e)
              },
              update: function(e, t) {
                var r = t.data.createUserVenueFavorite
                nt(e, s.slug, r),
                  a(''.concat(s.name, ' has been added to your favorites'), Ge),
                  n.push(p.venuePath(s.slug))
              },
              refetchQueries: g
            }),
            E = Object(le.a)(y, 1)[0],
            h = Object(r.useCallback)(
              function(e, t) {
                return v({
                  variables: {
                    name: e,
                    cityId: t && t.id ? t.id : null,
                    limit: 5
                  }
                })
              },
              [v]
            )
          Object(r.useEffect)(
            function() {
              t.name && t.name.length >= 3 && h(t.name, t.city)
            },
            [t.name, t.city, h]
          )
          var O = Object(r.useCallback)(
            function(e) {
              return E({ variables: { venueId: e.id } })
            },
            [E]
          )
          return (
            Object(r.useEffect)(
              function() {
                s && O(s)
              },
              [s, O]
            ),
            b.data &&
            b.data.similarVenuesByName &&
            b.data.similarVenuesByName.length
              ? o.a.createElement(
                  'div',
                  { className: 'similarVenueByName' },
                  o.a.createElement(
                    'div',
                    { className: 'similarVenueByNameTitle' },
                    'Are you adding',
                    ' ',
                    b.data.similarVenuesByName.length > 1
                      ? 'one of these destinations'
                      : 'this destination',
                    '?'
                  ),
                  o.a.createElement(
                    'div',
                    { className: 'similarVenueByNameItems' },
                    b.data.similarVenuesByName.map(function(e) {
                      return o.a.createElement(
                        'div',
                        { key: e.id, className: 'similarVenueByNameItem' },
                        o.a.createElement(
                          se.b,
                          {
                            to: p.venuePath(e.slug),
                            target: '_blank',
                            key: e.id,
                            className: 'similarVenueByNameItemName'
                          },
                          e.name
                        ),
                        o.a.createElement(
                          'div',
                          { className: 'similarVenueByNameItemType' },
                          ze(e)
                        ),
                        Qe(e, o.a.createElement('br', null)),
                        o.a.createElement(
                          'div',
                          { className: 'similarAddToFavoriteButtonContainer' },
                          o.a.createElement(
                            'button',
                            {
                              className: 'similarAddToFavoriteButton',
                              onClick: function() {
                                return u(e)
                              }
                            },
                            'Add to Favorites'
                          )
                        )
                      )
                    })
                  )
                )
              : null
          )
        }
      var rt = {
          appBar: { position: 'relative' },
          title: { margin: '0 auto' },
          body: { margin: '0 auto' },
          input: { minWidth: '500px' }
        },
        ot = {
          name: '',
          type: { id: null },
          streetAddress: '',
          zipcode: '',
          lat: '',
          lng: '',
          city: {}
        },
        it = function(e) {
          var t = e.open,
            n = e.toggleDialog,
            i = e.onCreatedVenue,
            l = Object(c.useMutation)(Xe, {
              onError(e) {
                console.log('error', e)
              },
              onCompleted(e) {
                i()
              },
              refetchQueries: [{ query: W }],
              awaitRefetchQueries: !0
            }),
            s = Object(le.a)(l, 1)[0],
            u = Object(r.useState)(Object(a.a)({}, ot)),
            m = Object(le.a)(u, 2),
            d = m[0],
            f = m[1],
            p = Object(r.useState)(
              'Please enter information about a place you enjoyed.'
            ),
            v = Object(le.a)(p, 2),
            b = v[0],
            g = v[1],
            y = function(e) {
              return function(t) {
                f(Object(a.a)(Object(a.a)({}, d), {}, { [e]: t.target.value }))
              }
            }
          return o.a.createElement(
            de.a,
            {
              open: t,
              onClose: n,
              fullScreen: !0,
              'aria-labelledby': 'form-dialog-title'
            },
            o.a.createElement(
              ye.a,
              { style: rt.appBar },
              o.a.createElement(
                Ee.a,
                null,
                o.a.createElement(
                  je.a,
                  {
                    edge: 'start',
                    color: 'inherit',
                    onClick: n,
                    'aria-label': 'close'
                  },
                  o.a.createElement(Oe.a, null)
                )
              )
            ),
            o.a.createElement(pe.a, { style: rt.title }, 'Add New Destination'),
            o.a.createElement(
              fe.a,
              { style: rt.body },
              o.a.createElement(ve.a, null, b),
              o.a.createElement(be.a, {
                id: 'venue-name',
                label: 'Venue name',
                value: d.name,
                onChange: y('name'),
                margin: 'normal',
                style: rt.input
              }),
              o.a.createElement('br', null),
              o.a.createElement(qe, {
                onVenueTypeSelected: function(e) {
                  f(Object(a.a)(Object(a.a)({}, d), {}, { type: { id: e } }))
                }
              }),
              o.a.createElement('br', null),
              o.a.createElement(be.a, {
                id: 'venue-street-address',
                name: 'street-address',
                label: 'Street address',
                value: d.streetAddress,
                onChange: y('streetAddress'),
                margin: 'normal',
                autoComplete: 'shipping street-address',
                style: rt.input
              }),
              o.a.createElement(ke, {
                onCitySelected: function(e) {
                  f(
                    Object(a.a)(
                      Object(a.a)({}, d),
                      {},
                      { city: e && e.value ? { id: e.value } : {} }
                    )
                  )
                }
              }),
              o.a.createElement(ge.a, {
                customInput: be.a,
                id: 'venue-zipcode',
                name: 'zipcode',
                label: 'Zipcode',
                value: d.zipcode,
                onChange: y('zipcode'),
                margin: 'normal',
                style: rt.input,
                autoComplete: 'postal-code',
                format: '#####'
              }),
              o.a.createElement(at, { venue: d }),
              o.a.createElement(
                'div',
                null,
                o.a.createElement(
                  ue.a,
                  {
                    color: 'primary',
                    onClick: function() {
                      ;(({
                        name: e,
                        type: t,
                        streetAddress: n,
                        city: a,
                        zipcode: r
                      }) => {
                        let o = {
                          name: !1,
                          type: !1,
                          streetAddress: !1,
                          city: !1,
                          zipcode: !1
                        }
                        return (
                          e && e.length >= 3 && (o.name = !0),
                          t && t.id && (o.type = !0),
                          n && n.length >= 2 && (o.streetAddress = !0),
                          a && a.id && (o.city = !0),
                          r && !isNaN(parseInt(r)) && (o.zipcode = !0),
                          -1 === Object.values(o).indexOf(!1)
                        )
                      })(d)
                        ? s({
                            variables: {
                              name: d.name,
                              typeId: d.type.id,
                              streetAddress: d.streetAddress,
                              zipcode: parseInt(d.zipcode),
                              cityId: d.city.id
                            }
                          }).then(function(e) {
                            f(Object(a.a)({}, ot)), n()
                          })
                        : g('Please enter valid venue information')
                    }
                  },
                  'Create venue'
                )
              )
            )
          )
        },
        lt = n(185),
        ct = n.n(lt),
        st = n(310),
        ut = n(305),
        mt = Object(ce.a)({
          appBar: { boxShadow: 'none', float: 'left', width: '300px' },
          tabIndicator: { backgroundColor: '#ffffff' }
        })(function(e) {
          var t = e.classes,
            n = e.venues,
            a = e.venueTypeFilter,
            r = e.onSetVenueTypeFilter
          return o.a.createElement(
            o.a.Fragment,
            null,
            o.a.createElement(
              ct.a,
              { position: 'static', className: t.appBar },
              o.a.createElement(
                st.a,
                {
                  value: a,
                  onChange: function(e, t) {
                    r(t)
                  },
                  classes: { indicator: t.tabIndicator },
                  orientation: 'vertical',
                  variant: 'scrollable',
                  scrollButtons: 'auto'
                },
                o.a.createElement(ut.a, { label: 'all', value: 'all' }),
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
                          }))
                  return Object.keys(t)
                })(n)
                  .sort()
                  .map(function(e, t) {
                    return o.a.createElement(ut.a, {
                      label: e,
                      value: e,
                      key: t
                    })
                  })
              )
            )
          )
        }),
        dt = Object(ce.a)({
          '@global': {
            '.venueItem': {
              border: '1px solid #eee',
              borderRadius: '8px',
              marginTop: '5px',
              marginBottom: '5px',
              padding: '15px',
              width: '49%',
              display: 'inline-block',
              '&:nth-child(odd)': { marginRight: '10px' }
            },
            '.venueItemTitle': {
              display: 'block',
              fontSize: '18px',
              fontWeight: 500,
              lineHeight: 1.6,
              color: '#333333',
              textDecoration: 'none',
              '&:hover': { textDecoration: 'underline' }
            },
            '.venueItemDescription': {},
            '.venueItemTypeBadge': {
              display: 'inline-block',
              padding: '1px 5px',
              backgroundColor: '#2196f3',
              color: '#fff',
              borderRadius: '3px',
              height: '22px'
            },
            '.venueItemTypeBadgeText': {
              marginLeft: '20px',
              marginTop: '3px',
              textTransform: 'uppercase',
              fontSize: '11px',
              fontWeight: 600,
              minWidth: '75px',
              textAlign: 'center'
            },
            '.venueItemLocation': {
              textTransform: 'uppercase',
              fontSize: '11px',
              fontWeight: 600,
              textDecoration: 'none',
              float: 'right',
              marginTop: '4px',
              color: '#666'
            },
            '.venueIcon': {
              float: 'left',
              width: '15px',
              height: 'auto',
              marginRight: '5px',
              position: 'relative',
              top: '2px'
            },
            '.venueUnlike': { float: 'right' }
          }
        })(function(e) {
          var t = e.venue,
            n = e.showDeleteFavoriteButton,
            a = e.onDeleteFavoriteCallback,
            r = Object(c.useMutation)(tt, {
              onError(e) {
                console.log('error', e)
              },
              update: function(e, t) {
                var n = t.data.deleteUserVenueFavorite
                l(e, n)
              },
              onCompleted: function() {
                a()
              },
              refetchQueries: [{ query: W }],
              awaitRefetchQueries: !0
            }),
            i = Object(le.a)(r, 1)[0],
            l = function(e, n) {
              try {
                var a = e.readQuery({
                  query: L,
                  variables: { venueSlug: t.slug }
                })
                ;(a.venueBySlug.venueStats = n),
                  e.writeQuery({
                    query: L,
                    variables: { venueSlug: t.slug },
                    data: a
                  })
              } catch (r) {}
            }
          return o.a.createElement(
            'div',
            { className: 'venueItem' },
            n &&
              o.a.createElement(
                'button',
                {
                  onClick: function() {
                    i({ variables: { venueId: t.id } })
                  },
                  className: 'venueUnlike'
                },
                'Unlike'
              ),
            o.a.createElement(
              se.b,
              { to: p.venuePath(t.slug), className: 'venueItemTitle' },
              t.name
            ),
            o.a.createElement(
              'div',
              { className: 'venueItemDescription' },
              o.a.createElement(
                'div',
                { className: 'venueItemTypeBadge' },
                (function(e, t) {
                  var n
                  switch (e.venueTypes[0].name) {
                    case 'restaurant':
                      n = o.a.createElement(Ve.a, { className: t })
                      break
                    case 'museum':
                      n = o.a.createElement(Fe.a, { className: t })
                      break
                    case 'zoo':
                      n = o.a.createElement(Be.a, { className: t })
                      break
                    case 'hiking trail':
                      n = o.a.createElement(De.a, { className: t })
                      break
                    case 'outdoor park':
                      n = o.a.createElement(Ae.a, { className: t })
                      break
                    case 'camp site':
                      n = o.a.createElement(Me.a, { className: t })
                      break
                    case 'outdoor playground':
                      n = o.a.createElement(Pe.a, { className: t })
                      break
                    default:
                      n = o.a.createElement(Le.a, { className: t })
                  }
                  return n
                })(t, 'venueIcon'),
                o.a.createElement(
                  'div',
                  { className: 'venueItemTypeBadgeText' },
                  t.venueTypes && t.venueTypes.length
                    ? ''.concat(t.venueTypes[0].name)
                    : ''
                )
              ),
              o.a.createElement(
                'a',
                {
                  href: We(t),
                  target: '_blank',
                  rel: 'noopener noreferrer',
                  className: 'venueItemLocation'
                },
                Re(t)
              )
            )
          )
        }),
        ft = Object(ce.a)({
          '@global': { '.venueList': { marginLeft: '320px' } }
        })(function(e) {
          var t = e.currentDashboardSection,
            n = e.isFavoritesDashboardSection,
            a = e.externalTriggerVenueRefresh,
            i = Object(c.useApolloClient)(),
            l = Object(r.useState)('all'),
            s = Object(le.a)(l, 2),
            u = s[0],
            m = s[1],
            d = Object(r.useState)([]),
            f = Object(le.a)(d, 2),
            p = f[0],
            v = f[1],
            b = Object(r.useState)(!0),
            g = Object(le.a)(b, 2),
            y = g[0],
            E = g[1]
          Object(r.useEffect)(
            function() {
              i.query({ query: W }).then(function(e) {
                var t = e.data
                v(n ? t.me.favoriteVenues : t.me.venues)
              }),
                m('all')
            },
            [t, y, a, n, i]
          )
          var h = function() {
            E(!y)
          }
          return o.a.createElement(
            r.Fragment,
            null,
            o.a.createElement(mt, {
              venues: p,
              onSetVenueTypeFilter: m,
              venueTypeFilter: u
            }),
            o.a.createElement(
              'div',
              { className: 'venueList' },
              p
                .filter(function(e) {
                  return 'all' === u || e.venueTypes[0].name === u
                })
                .map(function(e) {
                  return o.a.createElement(dt, {
                    key: e.id,
                    venue: e,
                    showDeleteFavoriteButton: n,
                    onDeleteFavoriteCallback: h
                  })
                })
            )
          )
        })
      function pt() {
        var e = Object(w.a)([
          '\n  mutation DeleteUserFollower($publicId: String!) {\n    deleteUserFollower(publicId: $publicId) {\n      followedByCurrentUser\n      followers\n      followees\n    }\n  }\n'
        ])
        return (
          (pt = function() {
            return e
          }),
          e
        )
      }
      function vt() {
        var e = Object(w.a)([
          '\n  mutation CreateUserFollower($publicId: String!) {\n    createUserFollower(publicId: $publicId) {\n      followedByCurrentUser\n      followers\n      followees\n    }\n  }\n'
        ])
        return (
          (vt = function() {
            return e
          }),
          e
        )
      }
      function bt() {
        var e = Object(w.a)([
          '\n  mutation UpdateCurrentUserFeedConfigMutation(\n    $cityIds: String\n    $venueTypeIds: String\n  ) {\n    updateUserFeedConfig(cityIds: $cityIds, venueTypeIds: $venueTypeIds) {\n      cityIds\n      venueTypeIds\n    }\n  }\n'
        ])
        return (
          (bt = function() {
            return e
          }),
          e
        )
      }
      function gt() {
        var e = Object(w.a)([
          '\n  mutation LoginMutation($email: String!, $password: String!) {\n    login(email: $email, password: $password) {\n      token\n      user {\n        id\n        firstName\n        lastName\n        email\n      }\n    }\n  }\n'
        ])
        return (
          (gt = function() {
            return e
          }),
          e
        )
      }
      function yt() {
        var e = Object(w.a)([
          '\n  mutation SignupMutation(\n    $email: String!\n    $password: String!\n    $firstName: String!\n    $lastName: String!\n  ) {\n    signup(\n      email: $email\n      password: $password\n      firstName: $firstName\n      lastName: $lastName\n    ) {\n      token\n      user {\n        id\n        firstName\n        lastName\n        email\n      }\n    }\n  }\n'
        ])
        return (
          (yt = function() {
            return e
          }),
          e
        )
      }
      var Et = Object(c.gql)(yt()),
        ht = Object(c.gql)(gt()),
        Ot = Object(c.gql)(bt()),
        jt = Object(c.gql)(vt()),
        Nt = Object(c.gql)(pt())
      const It = (e, t = 'on', n = null) => {
          const a = new Date(e),
            r = (new Date().getTime() - a.getTime()) / 1e3
          let o
          return (
            (o =
              r <= 60
                ? 'now'
                : r < 90
                ? Math.round(r / 60) + ' minute ago'
                : r <= 3600
                ? Math.round(r / 60) + ' minutes ago'
                : r < 5400
                ? Math.round(r / 3600) + ' hour ago'
                : r <= 86400
                ? Math.round(r / 3600) + ' hours ago'
                : n
                ? a.toLocaleTimeString('en-US', n)
                : 'at' === t
                ? t +
                  ' ' +
                  a.toLocaleTimeString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })
                : t +
                  ' ' +
                  a.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })),
            o
          )
        },
        St = {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: 'numeric',
          minute: '2-digit'
        }
      var Ct = Object(ce.a)({
          '@global': {
            '.feedItem': {
              borderBottom: '1px solid #eee',
              marginTop: '5px',
              marginBottom: '5px',
              padding: '15px'
            },
            '.feedItemTitle': {
              fontWeight: 600,
              color: '#000',
              textDecoration: 'none',
              fontSize: '15px',
              '&:hover': { textDecoration: 'underline' }
            },
            '.feedItemSubtitle': { fontSize: '12px' }
          }
        })(function(e) {
          var t = e.venue
          return o.a.createElement(
            'div',
            { className: 'feedItem' },
            o.a.createElement(
              se.b,
              { to: p.venuePath(t.slug), className: 'feedItemTitle' },
              t.name
            ),
            o.a.createElement(
              'div',
              { className: 'feedItemSubtitle' },
              'in ',
              Re(t),
              t.creator &&
                o.a.createElement(
                  r.Fragment,
                  null,
                  o.a.createElement('br', null),
                  'added ',
                  It(t.createdAt),
                  ' by \xa0',
                  o.a.createElement(
                    se.b,
                    { to: p.userProfilePath(t.creator.id) },
                    re(t.creator)
                  )
                )
            )
          )
        }),
        xt = {
          container: {
            position: 'relative',
            width: '350px',
            display: 'inline-block'
          },
          formControl: {
            minWidth: '500px',
            marginTop: '16px',
            marginBottom: '8px',
            height: '16px'
          }
        },
        wt = function(e) {
          var t = e.initialValue,
            n = e.onVenueTypeSelected,
            a = Object(c.useApolloClient)(),
            i = Object(r.useState)([]),
            l = Object(le.a)(i, 2),
            s = l[0],
            u = l[1],
            m = Object(r.useState)([]),
            d = Object(le.a)(m, 2),
            f = d[0],
            p = d[1]
          Object(r.useEffect)(
            function() {
              a.query({ query: z }).then(function(e) {
                var t = e.data
                p(
                  t.venueTypes.map(function(e) {
                    return { value: e.id, label: e.name }
                  })
                )
              })
            },
            [a]
          ),
            Object(r.useEffect)(
              function() {
                if (f && f.length && t) {
                  var e = t.split(',').map(function(e) {
                    return parseInt(e)
                  })
                  u(
                    f.filter(function(t) {
                      return e.includes(t.value)
                    })
                  )
                }
              },
              [f, t]
            )
          return o.a.createElement(
            'div',
            { style: xt.container },
            o.a.createElement(
              xe.a,
              { style: xt.formControl },
              o.a.createElement(
                Ce.a,
                { shrink: !0, htmlFor: 'age-simple' },
                'Venue type'
              )
            ),
            o.a.createElement(Ne.a, {
              value: s,
              defaultValue: null,
              onChange: function(e) {
                u(e), n(e)
              },
              options: f,
              placeholder: 'Select venue type',
              isClearable: !0,
              isMulti: !0,
              isSearchable: !1,
              escapeClearsValue: !0
            })
          )
        },
        kt = function(e) {
          var t = e.feedConfiguration,
            n = e.onFeedConfigurationUpdated,
            a = Object(r.useState)(),
            i = Object(le.a)(a, 2),
            l = i[0],
            c = i[1],
            s = Object(r.useState)(),
            u = Object(le.a)(s, 2),
            m = u[0],
            d = u[1]
          Object(r.useEffect)(
            function() {
              c(t.cityIds), d(t.venueTypeIds)
            },
            [t]
          )
          return o.a.createElement(
            'div',
            null,
            o.a.createElement(ke, {
              onCitySelected: function(e) {
                var t = e
                  ? e
                      .map(function(e) {
                        return e.value
                      })
                      .join(',')
                  : null
                c(t), n({ cityIds: t, venueTypeIds: m })
              },
              fieldLabel: 'Filter feed by city',
              placeholder: 'e.g.: San Francisco, CA',
              isMulti: !0,
              containerWidth: '350px',
              containerDisplay: 'inline-block',
              initialValue: t.cityDetails
            }),
            o.a.createElement('div', {
              style: { display: 'inline-block', width: '30px', height: '20px' }
            }),
            o.a.createElement(wt, {
              initialValue: m,
              onVenueTypeSelected: function(e) {
                var t = e
                  ? e
                      .map(function(e) {
                        return e.value
                      })
                      .join(',')
                  : null
                d(t), n({ venueTypeIds: t, cityIds: l })
              }
            })
          )
        },
        Tt = Object(ce.a)({
          '@global': {
            '.feedContainer': { maxWidth: '50%', minWidth: '400px' }
          }
        })(function() {
          var e = Object(c.useApolloClient)(),
            t = Object(r.useState)([]),
            n = Object(le.a)(t, 2),
            i = n[0],
            l = n[1],
            s = Object(r.useState)({
              cityIds: null,
              venueTypeIds: null,
              sort: 'DESC',
              first: 25,
              init: !1
            }),
            u = Object(le.a)(s, 2),
            m = u[0],
            d = u[1],
            f = Object(c.useMutation)(Ot),
            p = Object(le.a)(f, 1)[0]
          Object(r.useEffect)(
            function() {
              e.query({ query: Z }).then(function(e) {
                var t = e.data
                d(
                  Object(a.a)(
                    { init: !0, sort: 'DESC', first: 25 },
                    t.userFeedConfig
                  )
                )
              })
            },
            [e]
          ),
            Object(r.useEffect)(
              function() {
                m.init &&
                  e
                    .query({ query: _, variables: Object(a.a)({}, m) })
                    .then(function(e) {
                      var t = e.data
                      l(t.venues)
                    })
              },
              [e, m]
            )
          return o.a.createElement(
            'div',
            null,
            o.a.createElement(kt, {
              feedConfiguration: m,
              onFeedConfigurationUpdated: function(e) {
                e && d(Object(a.a)(Object(a.a)({}, e), {}, { init: !0 })),
                  p({
                    variables: {
                      cityIds: e.cityIds,
                      venueTypeIds: e.venueTypeIds
                    }
                  })
              }
            }),
            o.a.createElement(
              'div',
              { className: 'feedContainer' },
              i.map(function(e) {
                return o.a.createElement(Ct, { key: e.id, venue: e })
              })
            )
          )
        }),
        Ut = n(117),
        $t = n(118),
        qt = n(122),
        Vt = n(121),
        Ft = function(e) {
          return (function(t) {
            Object(qt.a)(a, t)
            var n = Object(Vt.a)(a)
            function a() {
              return Object(Ut.a)(this, a), n.apply(this, arguments)
            }
            return (
              Object($t.a)(a, [
                {
                  key: 'render',
                  value: function() {
                    return o.a.createElement(
                      'div',
                      { className: 'mainContainer' },
                      o.a.createElement(
                        'div',
                        { className: 'mainContent' },
                        o.a.createElement(e, this.props)
                      )
                    )
                  }
                }
              ]),
              a
            )
          })(o.a.Component)
        },
        Bt =
          (n(251),
          function() {
            var e = Object(r.useState)(null),
              t = Object(le.a)(e, 2),
              n = t[0],
              a = t[1],
              i = Object(c.useQuery)(ee),
              l = i.loading,
              s = i.error,
              u = i.data
            Object(r.useEffect)(
              function() {
                u && a(u.me)
              },
              [u]
            )
            var m = [{ query: ee }],
              d = Object(c.useMutation)(Nt, {
                onError(e) {
                  console.log('error', e)
                },
                refetchQueries: m
              }),
              f = Object(le.a)(d, 1)[0]
            return n && n.stats
              ? l
                ? null
                : s
                ? 'Error! '.concat(s)
                : o.a.createElement(
                    'div',
                    null,
                    o.a.createElement(
                      'div',
                      { className: 'followers-container' },
                      o.a.createElement(
                        'div',
                        { className: 'followers-list-container' },
                        o.a.createElement(
                          'div',
                          { className: 'followers-list-header' },
                          'Followees (',
                          n.stats.followees,
                          ')'
                        ),
                        n.followees.map(function(e) {
                          return o.a.createElement(
                            'div',
                            { key: e.id, className: 'followers-list-item' },
                            o.a.createElement(
                              se.b,
                              { to: p.userProfilePath(e.id) },
                              re(e)
                            ),
                            o.a.createElement(
                              'button',
                              {
                                onClick: function() {
                                  return (
                                    (t = e.publicId),
                                    f({ variables: { publicId: t } })
                                  )
                                  var t
                                },
                                className: 'inlineButton'
                              },
                              'Un-follow'
                            )
                          )
                        })
                      ),
                      o.a.createElement(
                        'div',
                        { className: 'followers-list-container' },
                        o.a.createElement(
                          'div',
                          { className: 'followers-list-header' },
                          'Followers (',
                          n.stats.followers,
                          ')'
                        ),
                        n.followers.map(function(e) {
                          return o.a.createElement(
                            'div',
                            { key: e.id, className: 'followers-list-item' },
                            o.a.createElement(
                              se.b,
                              { to: p.userProfilePath(e.id) },
                              re(e)
                            )
                          )
                        })
                      )
                    )
                  )
              : null
          }),
        Dt = {
          FEED: 'feed',
          MY_DESTINATIONS: 'my-destinations',
          FAVORITES: 'favorites',
          FOLLOWERS: 'followers'
        },
        At = Object(ce.a)({
          '@global': {
            '.sectionHeader': { marginBottom: '30px', display: 'flex' },
            '.sectionHeaderTitle': {
              flexGrow: 1,
              maxWidth: '200px',
              cursor: 'pointer',
              textDecoration: 'none',
              color: '#666',
              textAlign: 'center',
              textTransform: 'uppercase',
              borderRadius: '8px',
              margin: '0px 10px',
              fontSize: '14px',
              fontWeight: 600,
              lineHeight: 2.5,
              letterSpacing: '1.3px',
              border: '1px solid #eee'
            },
            '.sectionHeaderTitleSelected': { backgroundColor: '#f9f8f8' },
            '.venueList': { marginLeft: '320px' }
          }
        })(
          Ft(function(e) {
            var t = e.match,
              n = p.validatePageSection(t.params.section, Dt, Dt.FEED),
              a = Object(r.useState)(!1),
              i = Object(le.a)(a, 2),
              l = i[0],
              c = i[1],
              s = Object(r.useState)(!0),
              u = Object(le.a)(s, 2),
              m = u[0],
              d = u[1],
              f = function() {
                c(!l)
              },
              v = function(e, t) {
                return o.a.createElement(
                  se.b,
                  {
                    to: p.dashboardPath(t),
                    className: 'sectionHeaderTitle '.concat(
                      n === t ? 'sectionHeaderTitleSelected' : ''
                    )
                  },
                  e
                )
              }
            return o.a.createElement(
              o.a.Fragment,
              null,
              o.a.createElement(
                'div',
                { className: 'sectionHeader' },
                v('Feed', Dt.FEED),
                v('My destinations', Dt.MY_DESTINATIONS),
                v('Favorites', Dt.FAVORITES),
                v('Followers', Dt.FOLLOWERS),
                o.a.createElement(
                  ue.a,
                  {
                    variant: 'outlined',
                    style: { marginLeft: 'auto' },
                    onClick: f
                  },
                  o.a.createElement(me.a, null),
                  'Add Destination'
                ),
                o.a.createElement(it, {
                  open: l,
                  toggleDialog: f,
                  onCreatedVenue: function() {
                    return d(!m)
                  }
                })
              ),
              (function() {
                switch (n) {
                  case Dt.FEED:
                    return o.a.createElement(Tt, null)
                  case Dt.MY_DESTINATIONS:
                    return o.a.createElement(ft, {
                      currentDashboardSection: n,
                      isFavoritesDashboardSection: !1,
                      externalTriggerVenueRefresh: m
                    })
                  case Dt.FAVORITES:
                    return o.a.createElement(ft, {
                      currentDashboardSection: n,
                      isFavoritesDashboardSection: !0,
                      externalTriggerVenueRefresh: m
                    })
                  case Dt.FOLLOWERS:
                    return o.a.createElement(Bt, null)
                  default:
                    return o.a.createElement(Tt, null)
                }
              })()
            )
          })
        ),
        Mt = n(186),
        Pt = n.n(Mt),
        Lt = function(e) {
          var t = e.venue,
            n = b(
              ''.concat(
                (function(e) {
                  return e.venueTypes[0].image
                })(t)
              ),
              '300px'
            )
          return o.a.createElement(
            'div',
            { style: n.container },
            o.a.createElement(
              v.a,
              { variant: 'h2', style: n.headerText },
              o.a.createElement('strong', null, t.name)
            )
          )
        }
      n(131)
      var Wt = ({ venue: e }) => {
          const t = Object(c.useApolloClient)(),
            n = Object(r.useState)([]),
            a = Object(le.a)(n, 2),
            i = a[0],
            l = a[1]
          return (
            Object(r.useEffect)(() => {
              t.query({
                query: R,
                variables: { venueId: e.id, limit: 5, radius: 15 }
              }).then(({ data: e }) => {
                l(e.similarVenues)
              })
            }, [e, t]),
            o.a.createElement(
              'div',
              {
                className: 'sidebar-module',
                style: { display: i && i.length ? 'block' : 'none' }
              },
              o.a.createElement('h3', null, 'Similar places near by'),
              o.a.createElement(
                'div',
                { className: 'sidebar-module-body' },
                i &&
                  i.map(e =>
                    o.a.createElement(
                      'div',
                      { key: e.id },
                      o.a.createElement(
                        se.b,
                        { to: p.venuePath(e.slug) },
                        e.name
                      )
                    )
                  )
              )
            )
          )
        },
        zt = function(e) {
          var t = e.venue
          return o.a.createElement(
            'div',
            { className: 'sidebar-module' },
            o.a.createElement('h3', null, 'Location'),
            o.a.createElement(
              'div',
              { className: 'sidebar-module-body' },
              o.a.createElement(
                'a',
                {
                  href: ''
                    .concat('https://maps.google.com/?daddr=')
                    .concat(encodeURIComponent(Qe(t, ',', 'raw'))),
                  target: '_blank',
                  rel: 'noopener noreferrer'
                },
                Qe(t, o.a.createElement('br', null))
              )
            )
          )
        },
        Rt = function(e) {
          var t = e.venueId,
            n = e.venueSlug,
            a = e.favoriteByCurrentUser,
            r = e.onUpdateFavoritesStats,
            i = [{ query: W }],
            l = Object(c.useMutation)(et, {
              onError(e) {
                console.log('error', e)
              },
              update: function(e, t) {
                var a = t.data.createUserVenueFavorite
                nt(e, n, a), r(a)
              },
              refetchQueries: i
            }),
            s = Object(le.a)(l, 1)[0],
            u = Object(c.useMutation)(tt, {
              onError(e) {
                console.log('error', e)
              },
              update: function(e, t) {
                var a = t.data.deleteUserVenueFavorite
                nt(e, n, a), r(a)
              },
              refetchQueries: i
            }),
            m = Object(le.a)(u, 1)[0]
          return o.a.createElement(
            o.a.Fragment,
            null,
            a
              ? o.a.createElement(
                  'span',
                  null,
                  '\u2605\xa0',
                  o.a.createElement(
                    'button',
                    {
                      onClick: function(e) {
                        e.preventDefault(), m({ variables: { venueId: t } })
                      }
                    },
                    ' ',
                    'Unlike'
                  )
                )
              : o.a.createElement(
                  'button',
                  {
                    href: '#',
                    onClick: function(e) {
                      e.preventDefault(), s({ variables: { venueId: t } })
                    }
                  },
                  'Like'
                )
          )
        },
        Qt = {
          sectionHeader: { marginBottom: '15px' },
          columnWrapper: { display: 'flex' },
          mainColumn: { flexGrow: 3, maxWidth: '800px' },
          sideColumm: { flexGrow: 1, marginTop: '-20px' }
        },
        _t = function(e) {
          var t = e.match.params.venueSlug,
            n = Object(r.useState)(null),
            i = Object(le.a)(n, 2),
            l = i[0],
            s = i[1],
            u = Object(r.useState)(''),
            m = Object(le.a)(u, 2),
            d = m[0],
            f = m[1],
            p = Object(c.useQuery)(L, { variables: { venueSlug: t } }),
            b = p.loading,
            g = p.error,
            y = p.data
          Object(r.useEffect)(
            function() {
              y && (s(y.venueBySlug), f(ze(y.venueBySlug)))
            },
            [y]
          )
          return b
            ? null
            : g
            ? 'Error! '.concat(g)
            : t
            ? l &&
              o.a.createElement(
                'div',
                null,
                o.a.createElement(Lt, { venue: l }),
                o.a.createElement(
                  'div',
                  { className: 'mainContainer' },
                  o.a.createElement(
                    'div',
                    { className: 'mainContent' },
                    o.a.createElement(
                      v.a,
                      { variant: 'h5', style: Qt.sectionHeader },
                      l.name
                    ),
                    o.a.createElement(
                      'div',
                      { style: Qt.columnWrapper },
                      o.a.createElement(
                        'div',
                        { style: Qt.mainColumn },
                        o.a.createElement(
                          'div',
                          null,
                          'Liked by',
                          ' ',
                          o.a.createElement(
                            'strong',
                            null,
                            o.a.createElement(ge.a, {
                              value: l.venueStats.favorites,
                              thousandSeparator: !0,
                              displayType: 'text'
                            }),
                            ' ',
                            Pt()('person', l.venueStats.favorites)
                          ),
                          '. \xa0',
                          te() &&
                            o.a.createElement(Rt, {
                              venueId: l.id,
                              venueSlug: t,
                              favoriteByCurrentUser:
                                l.venueStats.favoriteByCurrentUser,
                              onUpdateFavoritesStats: function(e) {
                                s(
                                  Object(a.a)(
                                    Object(a.a)({}, l),
                                    {},
                                    { venueStats: Object(a.a)({}, e) }
                                  )
                                )
                              }
                            })
                        ),
                        o.a.createElement('br', null),
                        l.description &&
                          o.a.createElement('span', null, l.description),
                        'This ',
                        d,
                        ' is located in ',
                        l.city,
                        ', ',
                        l.state,
                        '.'
                      ),
                      o.a.createElement(
                        'div',
                        { style: Qt.sideColumm },
                        o.a.createElement(zt, { venue: l }),
                        o.a.createElement(Wt, { venue: l })
                      )
                    )
                  )
                )
              )
            : o.a.createElement('div', null, 'Venue not found.')
        },
        Ht = n(309),
        Gt = n(304),
        Jt = n(189),
        Yt = n(136),
        Kt = n.n(Yt),
        Zt = Object(Jt.a)({
          palette: {
            primary: { main: Kt.a[500] },
            background: { default: '#efefef' }
          },
          typography: { useNextVariants: !0 }
        }),
        Xt = n(68),
        en = n.n(Xt),
        tn = n(67),
        nn = n.n(tn),
        an = n(123),
        rn = n(56),
        on = n(307),
        ln = (function(e) {
          Object(qt.a)(n, e)
          var t = Object(Vt.a)(n)
          function n() {
            var e
            Object(Ut.a)(this, n)
            for (var r = arguments.length, o = new Array(r), i = 0; i < r; i++)
              o[i] = arguments[i]
            return (
              ((e = t.call.apply(t, [this].concat(o))).state = {
                login: void 0 === e.props.login || e.props.login,
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                errorMessage: null
              }),
              (e._update = (function() {
                var e = Object(an.a)(
                  nn.a.mark(function e(t, n) {
                    return nn.a.wrap(function(e) {
                      for (;;)
                        switch ((e.prev = e.next)) {
                          case 0:
                            t.writeQuery({
                              query: K,
                              data: {
                                currentUser: Object(a.a)(
                                  Object(a.a)({}, n.user),
                                  {},
                                  { token: n.token }
                                )
                              }
                            })
                          case 1:
                          case 'end':
                            return e.stop()
                        }
                    }, e)
                  })
                )
                return function(t, n) {
                  return e.apply(this, arguments)
                }
              })()),
              (e._confirm = (function() {
                var t = Object(an.a)(
                  nn.a.mark(function t(n) {
                    var a, r, o
                    return nn.a.wrap(function(t) {
                      for (;;)
                        switch ((t.prev = t.next)) {
                          case 0:
                            ;(e.state.error = null),
                              (a = e.state.login ? n.login : n.signup),
                              (r = a.token),
                              (o = a.user),
                              e._saveUserData(r, o),
                              (document.location = p.dashboardPath(''))
                          case 4:
                          case 'end':
                            return t.stop()
                        }
                    }, t)
                  })
                )
                return function(e) {
                  return t.apply(this, arguments)
                }
              })()),
              (e._saveUserData = function(e, t) {
                ne(e, t)
              }),
              (e._error = (function() {
                var t = Object(an.a)(
                  nn.a.mark(function t(n) {
                    var a
                    return nn.a.wrap(function(t) {
                      for (;;)
                        switch ((t.prev = t.next)) {
                          case 0:
                            ;(a = n.graphQLErrors),
                              e.state.login && a && a[0] && a[0].message
                                ? e.setState({ errorMessage: a[0].message })
                                : a &&
                                  a[0] &&
                                  a[0].extensions.exception.errors[0].message &&
                                  e.setState({
                                    errorMessage:
                                      a[0].extensions.exception.errors[0]
                                        .message
                                  })
                          case 2:
                          case 'end':
                            return t.stop()
                        }
                    }, t)
                  })
                )
                return function(e) {
                  return t.apply(this, arguments)
                }
              })()),
              e
            )
          }
          return (
            Object($t.a)(n, [
              {
                key: 'componentDidUpdate',
                value: function(e) {
                  e.open !== this.props.open &&
                    this.setState({ errorMessage: null }),
                    e.login !== this.props.login &&
                      this.setState({ login: this.props.login })
                }
              },
              {
                key: 'render',
                value: function() {
                  var e = this,
                    t = this.state,
                    n = t.login,
                    a = t.email,
                    r = t.password,
                    i = t.firstName,
                    l = t.lastName,
                    c = t.errorMessage,
                    s = this.props.classes
                  return o.a.createElement(
                    de.a,
                    {
                      open: this.props.open,
                      onClose: this.props.toggleDialog,
                      maxWidth: 'sm',
                      fullWidth: !0,
                      'aria-labelledby': 'form-dialog-title'
                    },
                    o.a.createElement(
                      pe.a,
                      { id: 'login-dialog-title' },
                      n ? 'Login' : 'Sign Up'
                    ),
                    o.a.createElement(
                      fe.a,
                      null,
                      c &&
                        o.a.createElement(
                          ve.a,
                          { className: s.dialogMainError },
                          c
                        ),
                      o.a.createElement(
                        'div',
                        { className: s.dialogMainContent },
                        !n &&
                          o.a.createElement(
                            'span',
                            null,
                            o.a.createElement(be.a, {
                              id: 'firstName',
                              label: 'First name',
                              error: !!c,
                              value: i,
                              onChange: function(t) {
                                return e.setState({ firstName: t.target.value })
                              },
                              margin: 'normal',
                              fullWidth: !0
                            }),
                            o.a.createElement(be.a, {
                              id: 'lastName',
                              label: 'Last name',
                              error: !!c,
                              value: l,
                              onChange: function(t) {
                                return e.setState({ lastName: t.target.value })
                              },
                              margin: 'normal',
                              fullWidth: !0
                            })
                          ),
                        o.a.createElement(be.a, {
                          id: 'email',
                          label: 'Email',
                          error: !!c,
                          value: a,
                          onChange: function(t) {
                            return e.setState({ email: t.target.value })
                          },
                          margin: 'normal',
                          fullWidth: !0
                        }),
                        o.a.createElement(be.a, {
                          id: 'password',
                          label: 'Password',
                          error: !!c,
                          type: 'password',
                          autoComplete: 'current-password',
                          onChange: function(t) {
                            return e.setState({ password: t.target.value })
                          },
                          margin: 'normal',
                          fullWidth: !0
                        })
                      )
                    ),
                    o.a.createElement(
                      on.a,
                      null,
                      o.a.createElement(
                        ue.a,
                        {
                          onClick: function() {
                            return e.setState({ login: !n, errorMessage: null })
                          },
                          color: 'primary',
                          style: { marginRight: 'auto' }
                        },
                        n
                          ? 'need to create an account?'
                          : 'already have an account?'
                      ),
                      o.a.createElement(
                        ue.a,
                        { onClick: this.props.toggleDialog, color: 'primary' },
                        'Cancel'
                      ),
                      o.a.createElement(
                        rn.Mutation,
                        {
                          mutation: n ? ht : Et,
                          variables: {
                            email: a,
                            password: r,
                            firstName: i,
                            lastName: l
                          },
                          update: function(t, a) {
                            var r = a.data
                            return e._update(t, n ? r.login : r.signup)
                          },
                          onCompleted: function(t) {
                            return e._confirm(t)
                          },
                          onError: function(t) {
                            return e._error(t)
                          }
                        },
                        function(e) {
                          return o.a.createElement(
                            ue.a,
                            { color: 'primary', onClick: e },
                            n ? 'login' : 'create account'
                          )
                        }
                      )
                    )
                  )
                }
              }
            ]),
            n
          )
        })(r.Component),
        cn = Object(m.g)(
          Object(ce.a)({
            dialogMainContent: {
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column'
            },
            dialogMainError: { textAlign: 'center' }
          })(ln)
        ),
        sn = void 0,
        un = ae(
          Object(m.g)(function(e) {
            var t = e.currentUser,
              n = e.className,
              a = Object(r.useState)(!1),
              i = Object(le.a)(a, 2),
              l = i[0],
              c = i[1],
              s = Object(r.useState)(!0),
              u = Object(le.a)(s, 2),
              m = u[0],
              d = u[1]
            Object(r.useEffect)(function() {
              var e
              ;(e = function() {
                sn.setState({ dialogOpen: !0, login: !1 }), c(!0), d(!1)
              }),
                window.addEventListener('openSignUpModal', () => e())
            })
            var f = function() {
              c(!l), d(!0)
            }
            return te()
              ? o.a.createElement(
                  v.a,
                  { variant: 'button', color: 'inherit', className: n },
                  (function(e) {
                    return e && e.id ? 'Welcome, '.concat(e.firstName) : ''
                  })(t)
                )
              : o.a.createElement(
                  'span',
                  null,
                  o.a.createElement(
                    ue.a,
                    { onClick: f, className: n, color: 'inherit' },
                    'Login'
                  ),
                  o.a.createElement(cn, { open: l, login: m, toggleDialog: f })
                )
          })
        ),
        mn = n(187),
        dn = n.n(mn),
        fn = n(190)
      var pn = ae(
          Object(m.g)(({ classes: e, currentUser: t, history: n }) => {
            const a = Object(r.useState)(null),
              i = Object(le.a)(a, 2),
              l = i[0],
              c = i[1],
              s = e => {
                c(l ? null : e.currentTarget)
              }
            return o.a.createElement(
              'span',
              { className: e.menuWrapper },
              o.a.createElement(
                je.a,
                {
                  onClick: s,
                  className: e.menuButton,
                  color: 'inherit',
                  'aria-label': 'Menu'
                },
                o.a.createElement(dn.a, null)
              ),
              o.a.createElement(
                fn.a,
                {
                  id: 'simple-menu',
                  anchorEl: l,
                  open: Boolean(l),
                  onClose: s
                },
                o.a.createElement(
                  Ue.a,
                  { component: se.b, to: p.home, onClick: s },
                  'Home'
                ),
                o.a.createElement(
                  Ue.a,
                  { component: se.b, to: p.dashboardPath(''), onClick: s },
                  'Dashboard'
                ),
                o.a.createElement(
                  Ue.a,
                  { component: se.b, to: p.userProfilePath(t.id), onClick: s },
                  'My profile'
                ),
                o.a.createElement(
                  Ue.a,
                  {
                    onClick: () => {
                      localStorage.removeItem(I),
                        localStorage.removeItem(S),
                        n.push('/')
                    }
                  },
                  'Logout'
                )
              )
            )
          })
        ),
        vn = n(119),
        bn = n.n(vn)
      n(253)
      function gn() {
        const e = Object(w.a)([
          '\n  query($conversationalistUserId: Int!) {\n    conversation(conversationalistUserId: $conversationalistUserId) {\n      id\n      body\n      status\n      messageType\n      recipient {\n        id\n        firstName\n        lastName\n      }\n      sender {\n        id\n        firstName\n        lastName\n      }\n      createdAt\n    }\n  }\n'
        ])
        return (
          (gn = function() {
            return e
          }),
          e
        )
      }
      function yn() {
        const e = Object(w.a)([
          '\n  query {\n    conversationalists {\n      id\n      publicId\n      firstName\n      lastName\n      createdAt\n    }\n  }\n'
        ])
        return (
          (yn = function() {
            return e
          }),
          e
        )
      }
      function En() {
        const e = Object(w.a)([
          '\n  query($status: String) {\n    messages(status: $status) {\n      id\n      body\n      status\n      messageType\n      recipient {\n        id\n        firstName\n        lastName\n      }\n      sender {\n        id\n        firstName\n        lastName\n      }\n      createdAt\n    }\n  }\n'
        ])
        return (
          (En = function() {
            return e
          }),
          e
        )
      }
      function hn() {
        const e = Object(w.a)([
          '\n  query {\n    messageCount {\n      unread\n      read\n      archived\n      deleted\n    }\n  }\n'
        ])
        return (
          (hn = function() {
            return e
          }),
          e
        )
      }
      const On = Object(c.gql)(hn()),
        jn = (Object(c.gql)(En()), Object(c.gql)(yn())),
        Nn = Object(c.gql)(gn())
      var In = () => {
        const e = Object(r.useState)(!1),
          t = Object(le.a)(e, 2),
          n = t[0],
          a = t[1],
          i = Object(c.useQuery)(On, { fetchPolicy: 'no-cache' }).data
        return (
          Object(r.useEffect)(() => {
            i && i.messageCount && i.messageCount && a(!!i.messageCount.unread)
          }, [i]),
          o.a.createElement('div', {
            className: 'unreadIndicator',
            style: { display: ''.concat(n ? 'block' : 'none') }
          })
        )
      }
      var Sn = ({ classes: e }) =>
        o.a.createElement(
          o.a.Fragment,
          null,
          o.a.createElement(
            'div',
            { className: 'messagesButtonWrapper' },
            o.a.createElement(
              je.a,
              {
                className: e.messagesButton,
                color: 'inherit',
                'aria-label': 'Messages',
                component: se.b,
                to: p.messagesPath('')
              },
              o.a.createElement(bn.a, null)
            ),
            o.a.createElement(In, null)
          )
        )
      class Cn extends r.Component {
        render() {
          const e = this.props.classes
          return o.a.createElement(
            'div',
            { className: e.root },
            o.a.createElement(
              ye.a,
              {
                position: 'fixed',
                style: { background: 'transparent', boxShadow: 'none' }
              },
              o.a.createElement(
                Ee.a,
                { variant: 'dense', className: e.container },
                o.a.createElement(
                  v.a,
                  {
                    className: e.logoText,
                    variant: 'button',
                    color: 'inherit'
                  },
                  'KidTrip'
                ),
                o.a.createElement(v.a, {
                  variant: 'h6',
                  color: 'inherit',
                  className: e.grow
                }),
                o.a.createElement(un, { className: e.loginButton }),
                te() &&
                  o.a.createElement(
                    o.a.Fragment,
                    null,
                    o.a.createElement(Sn, { classes: e }),
                    o.a.createElement(pn, { classes: e })
                  )
              )
            )
          )
        }
      }
      var xn = ae(Object(m.g)(Cn))
      const wn = {
          root: { flexGrow: 1 },
          grow: { flexGrow: 1 },
          messagesButton: { marginLeft: 3, marginRight: -10 },
          menuButton: { marginLeft: -12, marginRight: 20 },
          menuWrapper: { marginLeft: 15 }
        },
        kn = Object(a.a)(
          Object(a.a)({}, wn),
          {},
          {
            container: {
              borderBottom: '1px solid',
              borderBottomColor: en.a[100],
              backgroundColor: 'white'
            },
            grow: Object(a.a)(
              Object(a.a)({}, wn.grow),
              {},
              { color: en.a[500] }
            ),
            menuButton: Object(a.a)(
              Object(a.a)({}, wn.menuButton),
              {},
              { color: en.a[500] }
            ),
            messagesButton: Object(a.a)(
              Object(a.a)({}, wn.messagesButton),
              {},
              { color: en.a[500] }
            ),
            loginButton: { color: en.a[500] },
            logoText: { color: en.a[500] }
          }
        )
      var Tn = Object(m.g)(e => {
          const t = d(e.location) ? wn : kn,
            n = Object(ce.a)(t)(xn)
          return o.a.createElement(n, null)
        }),
        Un =
          (n(254),
          function() {
            var e = Je(),
              t = e.clearNotifications,
              n = e.notifications
            return n && n.length
              ? o.a.createElement(
                  r.Fragment,
                  null,
                  n.map(function(e, n) {
                    return o.a.createElement(
                      'div',
                      { key: n, className: 'sessionNotification' },
                      o.a.createElement(
                        'div',
                        {
                          className: 'sessionNotificationContent sessionNotificationLevel-'.concat(
                            e.type
                          )
                        },
                        e.message,
                        o.a.createElement(
                          'div',
                          {
                            onClick: function() {
                              return t()
                            },
                            className: 'closeSessionNotification'
                          },
                          '\xd7'
                        )
                      )
                    )
                  })
                )
              : null
          }),
        $n = function(e) {
          var t = e.title,
            n = e.venues
          return o.a.createElement(
            'div',
            { className: 'sidebar-module' },
            o.a.createElement('h3', null, t),
            o.a.createElement(
              'div',
              { className: 'sidebar-module-body' },
              n.map(function(e) {
                return o.a.createElement(Ct, { key: e.id, venue: e })
              })
            )
          )
        }
      n(255)
      var qn = ae(({ userProfile: e, currentUser: t }) => {
          const n = [
              { query: X, variables: { publicId: e.publicId } },
              { query: ee }
            ],
            i = Object(c.useMutation)(jt, {
              onError(e) {
                console.log('error', e)
              },
              refetchQueries: n
            }),
            l = Object(le.a)(i, 2),
            s = l[0],
            u = l[1].loading,
            m = Object(c.useMutation)(Nt, {
              onError(e) {
                console.log('error', e)
              },
              refetchQueries: n
            }),
            d = Object(le.a)(m, 2),
            f = d[0],
            v = d[1].loading,
            g = b(e.config.headerImageUrl, '300px')
          return o.a.createElement(
            'div',
            {
              style: Object(a.a)(
                Object(a.a)({}, g.container),
                {},
                { borderRadius: '8px' }
              )
            },
            o.a.createElement(
              'div',
              { className: 'headerUserInfo' },
              o.a.createElement(
                'div',
                { className: 'headerUserInfoName' },
                e.user.firstName,
                e.user.lastName &&
                  e.user.lastName.length &&
                  o.a.createElement(
                    r.Fragment,
                    null,
                    '\xa0',
                    e.user.lastName[0]
                  ),
                '.'
              ),
              o.a.createElement(
                'div',
                { className: 'headerUserInfoStats' },
                o.a.createElement(
                  'div',
                  null,
                  o.a.createElement(
                    'span',
                    null,
                    e.stats.created,
                    ' places added'
                  ),
                  '\xa0\xb7\xa0',
                  o.a.createElement(
                    'span',
                    null,
                    e.stats.favorited,
                    ' places liked'
                  )
                ),
                o.a.createElement(
                  'div',
                  null,
                  o.a.createElement(
                    'span',
                    null,
                    e.stats.followees,
                    ' following'
                  ),
                  '\xa0\xb7\xa0',
                  o.a.createElement(
                    'span',
                    null,
                    e.stats.followers,
                    ' followers'
                  ),
                  '\xa0\xb7\xa0',
                  t.id === e.user.id
                    ? 'Your Profile'
                    : e.stats.followedByCurrentUser
                    ? v
                      ? o.a.createElement('span', null, 'Loading...')
                      : o.a.createElement(
                          'button',
                          {
                            onClick: () =>
                              f({ variables: { publicId: e.publicId } }),
                            className: 'headerUserButton'
                          },
                          'Un-follow'
                        )
                    : u
                    ? o.a.createElement('span', null, 'Loading...')
                    : o.a.createElement(
                        'button',
                        {
                          onClick: () =>
                            s({ variables: { publicId: e.publicId } }),
                          className: 'headerUserButton'
                        },
                        'Follow'
                      ),
                  t.id === e.user.id
                    ? null
                    : e.stats.followsCurrentUser
                    ? o.a.createElement(
                        'span',
                        null,
                        '\xa0\xb7',
                        o.a.createElement(
                          je.a,
                          {
                            style: { padding: '0px 5px 0px 6px' },
                            color: 'inherit',
                            'aria-label': 'Compose message',
                            component: se.b,
                            to: p.messagesPath(e.user.id)
                          },
                          o.a.createElement(bn.a, null)
                        )
                      )
                    : null
                )
              )
            )
          )
        }),
        Vn = Ft(function(e) {
          var t = e.match.params.userId,
            n = Object(r.useState)(null),
            a = Object(le.a)(n, 2),
            i = a[0],
            l = a[1],
            s = Object(c.useQuery)(X, { variables: { publicId: t } }),
            u = s.loading,
            m = s.error,
            d = s.data
          return (
            Object(r.useEffect)(
              function() {
                d && l(d.userProfile)
              },
              [d]
            ),
            u
              ? null
              : m
              ? 'Error! '.concat(m)
              : t
              ? !!i &&
                o.a.createElement(
                  'div',
                  null,
                  o.a.createElement(qn, { userProfile: i }),
                  o.a.createElement(
                    'div',
                    { className: 'contentContainer' },
                    o.a.createElement(
                      'div',
                      { className: 'contentContainerMain' },
                      'More to come...'
                    ),
                    o.a.createElement(
                      'div',
                      { className: 'contentContainerSide' },
                      i.recentAddedVenues &&
                        i.recentAddedVenues.length &&
                        o.a.createElement($n, {
                          title: 'Recently added',
                          venues: i.recentAddedVenues
                        }),
                      i.recentFavoriteVenues &&
                        i.recentFavoriteVenues.length &&
                        o.a.createElement($n, {
                          title: 'Recently liked',
                          venues: i.recentFavoriteVenues
                        })
                    )
                  )
                )
              : o.a.createElement('div', null, 'User profile not found.')
          )
        })
      n(256)
      function Fn() {
        const e = Object(w.a)([
          '\n  mutation CreateMessage(\n    $conversationalistUserId: Int!\n    $messageType: String!\n    $body: String!\n  ) {\n    createMessage(\n      conversationalistUserId: $conversationalistUserId\n      messageType: $messageType\n      body: $body\n    ) {\n      id\n      body\n      status\n      messageType\n      recipient {\n        id\n      }\n      sender {\n        id\n      }\n    }\n  }\n'
        ])
        return (
          (Fn = function() {
            return e
          }),
          e
        )
      }
      function Bn() {
        const e = Object(w.a)([
          '\n  mutation UpdateConversationMutation(\n    $conversationalistUserId: Int!\n    $status: String!\n  ) {\n    updateConversation(\n      conversationalistUserId: $conversationalistUserId\n      status: $status\n    ) {\n      id\n      body\n      status\n      messageType\n      recipient {\n        id\n        firstName\n        lastName\n      }\n      sender {\n        id\n        firstName\n        lastName\n      }\n      createdAt\n    }\n  }\n'
        ])
        return (
          (Bn = function() {
            return e
          }),
          e
        )
      }
      const Dn = Object(c.gql)(Bn()),
        An = Object(c.gql)(Fn())
      var Mn = ({ message: e, currentUser: t }) => {
          return o.a.createElement(
            'div',
            {
              className: 'message '.concat(
                ((n = t.id),
                (a = e.sender.id),
                n === a ? 'fromCurrentUser' : '')
              )
            },
            o.a.createElement(
              'div',
              { className: 'messageContainer' },
              o.a.createElement(
                'div',
                { className: 'messageSender '.concat(e.status) },
                re(e.sender)
              ),
              e.body
            ),
            o.a.createElement(
              'div',
              { className: 'messageTimestamp' },
              It(e.createdAt, null, St),
              ' '
            )
          )
          var n, a
        },
        Pn = n(308),
        Ln = n(188),
        Wn = n.n(Ln)
      const zn = Object(Pn.a)(e => ({
        main: { display: 'flex' },
        button: { margin: e.spacing(1), marginRight: '0px', maxHeight: '36px' }
      }))
      var Rn = ({ conversationalistUserId: e, onMessageCreated: t }) => {
        const n = Object(r.useState)(),
          a = Object(le.a)(n, 2),
          i = a[0],
          l = a[1],
          s = zn(),
          u = Object(r.useRef)(null),
          m = Object(c.useMutation)(An, {
            onError(e) {
              console.log('error', e)
            },
            onCompleted: e => {
              l(''), t()
            }
          }),
          d = Object(le.a)(m, 1)[0]
        Object(r.useEffect)(() => {
          u.current && u.current.focus()
        })
        return e
          ? o.a.createElement(
              'div',
              { className: s.main },
              o.a.createElement(be.a, {
                id: 'standard-multiline-flexible',
                label: 'Type message',
                multiline: !0,
                rowsMax: 5,
                value: i,
                onChange: e => l(e.target.value),
                fullWidth: !0,
                inputRef: u
              }),
              o.a.createElement(
                ue.a,
                {
                  variant: 'contained',
                  color: 'primary',
                  className: s.button,
                  endIcon: o.a.createElement(Wn.a, null),
                  onClick: () =>
                    (() => {
                      if (i && i.length > 2)
                        return d({
                          variables: {
                            conversationalistUserId: e,
                            messageType: 'direct',
                            body: i
                          }
                        })
                    })()
                },
                'Send'
              )
            )
          : null
      }
      var Qn = ae(
        Ft(({ match: e, currentUser: t }) => {
          const n = Object(r.useState)(null),
            i = Object(le.a)(n, 2),
            l = i[0],
            s = i[1],
            u = Object(r.useState)([]),
            m = Object(le.a)(u, 2),
            d = m[0],
            f = m[1],
            v = Object(r.useState)([]),
            b = Object(le.a)(v, 2),
            g = b[0],
            y = b[1],
            E = Object(r.useRef)(null),
            h = Object(c.useQuery)(jn, {
              fetchPolicy: 'network-only',
              onCompleted: t => {
                t &&
                  t.conversationalists &&
                  (f(t.conversationalists),
                  U(t.conversationalists) &&
                    C({ variables: { publicId: e.params.publicId } }))
              }
            }),
            O = h.loading,
            j = h.error,
            N = Object(c.useLazyQuery)(Nn, {
              fetchPolicy: 'no-cache',
              onCompleted: e => {
                y(e.conversation), k(e.conversation)
              }
            }),
            I = Object(le.a)(N, 1)[0],
            S = Object(c.useLazyQuery)(X, {
              onCompleted: e => {
                e &&
                  e.userProfile &&
                  e.userProfile.user &&
                  f(
                    [
                      Object(a.a)(
                        Object(a.a)({}, e.userProfile.user),
                        {},
                        {
                          id: parseInt(e.userProfile.user.id),
                          createdAt: new Date()
                        }
                      )
                    ].concat(d)
                  )
              }
            }),
            C = Object(le.a)(S, 1)[0],
            x = Object(c.useMutation)(Dn, {
              onError(e) {
                console.log('error', e)
              },
              onCompleted: e => {
                y(e.updateConversation)
              }
            }),
            w = Object(le.a)(x, 1)[0],
            k = e => {
              e &&
                e.filter(
                  e => 'unread' === e.status && parseInt(e.sender.id) === l
                ).length &&
                setTimeout(
                  () =>
                    w({
                      variables: { conversationalistUserId: l, status: 'read' }
                    }),
                  3e3
                )
            }
          Object(r.useEffect)(() => {
            const t = e.params.publicId
              ? ((n = e.params.publicId), atob(n) / 999999999)
              : null
            var n
            s(t), t && I({ variables: { conversationalistUserId: t } })
          }, [e.params.publicId, I]),
            Object(r.useEffect)(() => {
              T()
            }, [g])
          const T = () => {
              var e
              null === (e = E.current) ||
                void 0 === e ||
                e.scrollIntoView({ behavior: 'smooth' })
            },
            U = e => !e.filter(e => e.id === l).length
          return O
            ? null
            : j
            ? 'Error! '.concat(j)
            : o.a.createElement(
                'div',
                { className: 'conversations' },
                o.a.createElement(
                  'div',
                  { className: 'conversationalists' },
                  d.map(e =>
                    o.a.createElement(
                      se.b,
                      {
                        to: p.messagesPath(e.id),
                        key: e.id,
                        className: 'conversationalist '.concat(
                          l === e.id ? 'active' : ''
                        )
                      },
                      o.a.createElement('div', null, re(e)),
                      o.a.createElement('div', null, It(e.createdAt, 'at'))
                    )
                  )
                ),
                o.a.createElement(
                  'div',
                  { className: 'conversation' },
                  o.a.createElement(
                    'div',
                    { className: 'messages' },
                    g && g.length
                      ? g.map(e =>
                          o.a.createElement(Mn, {
                            message: e,
                            currentUser: t,
                            key: e.id
                          })
                        )
                      : o.a.createElement(
                          'div',
                          { className: 'noMessages' },
                          o.a.createElement('div', null, 'No messages')
                        ),
                    o.a.createElement('div', { ref: E })
                  ),
                  o.a.createElement(Rn, {
                    conversationalistUserId: l,
                    onMessageCreated: () => {
                      I({ variables: { conversationalistUserId: l } })
                    }
                  })
                )
              )
        })
      )
      n(257)
      class _n extends r.Component {
        render() {
          const e = this.props,
            t = e.classes,
            n = e.location
          return o.a.createElement(
            He,
            null,
            o.a.createElement(
              Gt.a,
              { theme: Zt },
              o.a.createElement(
                'div',
                null,
                o.a.createElement(Ht.a, null),
                o.a.createElement(Tn, null),
                !d(n) &&
                  o.a.createElement('div', { className: t.appBarSpacer }),
                o.a.createElement(
                  m.c,
                  null,
                  o.a.createElement(m.a, {
                    exact: !0,
                    path: p.home,
                    component: ie
                  }),
                  o.a.createElement(m.a, { path: p.dashboard, component: At }),
                  o.a.createElement(m.a, { path: p.venue, component: _t }),
                  o.a.createElement(m.a, {
                    path: p.userProfile,
                    component: Vn
                  }),
                  o.a.createElement(m.a, { path: p.messages, component: Qn })
                ),
                o.a.createElement(Un, null)
              )
            )
          )
        }
      }
      var Hn = Object(m.g)(
        Object(ce.a)({
          '@global': {
            body: {
              fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
              fontWeight: 400
            },
            '.mainContainer': { display: 'flex', justifyContent: 'center' },
            '.mainContent': {
              maxWidth: '1200px',
              flexGrow: '1',
              margin: '25px',
              backgroundColor: '#ffffff',
              padding: '25px',
              borderRadius: '8px'
            }
          },
          appBarSpacer: { height: '49px' }
        })(_n)
      )
      Boolean(
        'localhost' === window.location.hostname ||
          '[::1]' === window.location.hostname ||
          window.location.hostname.match(
            /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
          )
      )
      n(258)
      const Gn = localStorage.getItem(I),
        Jn = new c.HttpLink({
          uri: 'http://api.mykidtrip.com',
          credentials: 'same-origin',
          headers: { authorization: Gn ? 'Bearer '.concat(Gn) : '' }
        }),
        Yn = new c.ApolloClient({
          link: c.ApolloLink.from([
            Object(u.a)(({ graphQLErrors: e, networkError: t }) => {
              e &&
                e.map(({ message: e, locations: t, path: n }) =>
                  console.log(
                    '[GraphQL error]: Message: '
                      .concat(e, ', Location: ')
                      .concat(t, ', Path: ')
                      .concat(n)
                  )
                ),
                t && console.log('[Network error]: '.concat(t))
            }),
            Jn
          ]),
          cache: new s.InMemoryCache({
            typePolicies: {
              User: {
                fields: {
                  followees: { merge: !1 },
                  favoriteVenues: { merge: !1 }
                }
              }
            }
          }),
          resolvers: {}
        })
      Yn.writeQuery({
        query: K,
        data: {
          currentUser: Object(a.a)(
            {},
            (() => {
              const e = localStorage.getItem(S)
              return e
                ? JSON.parse(e)
                : {
                    __typename: 'User',
                    id: null,
                    firstName: null,
                    lastName: null,
                    email: null
                  }
            })()
          )
        }
      }),
        l.a.render(
          o.a.createElement(
            se.a,
            null,
            o.a.createElement(
              c.ApolloProvider,
              { client: Yn },
              o.a.createElement(Hn, null)
            )
          ),
          document.getElementById('root')
        ),
        'serviceWorker' in navigator &&
          navigator.serviceWorker.ready.then(function(e) {
            e.unregister()
          })
    }
  },
  [[259, 1, 2]]
])
//# sourceMappingURL=main.7b7ab215.chunk.js.map
