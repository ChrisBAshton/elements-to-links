/**
 * elements-to-links. Project available at: https://github.com/ChrisBAshton/elements-to-links
 *
 * Version: 0.1.0
 * Author:  Chris Ashton (@ChrisBAshton)
 */
(function (global) {

    'use strict';

    var ElementsToLinks = (function () {

        var convertSelector,
            elementsToLinksClassName;

        function convert (options) {
            options = options || {};
            convertSelector          = options.selector || 'h1, h2, h3, h4, h5, h6';
            elementsToLinksClassName = 'elements_to_links__link';

            makeLinks(convertSelector);
            styleLinks(convertSelector);
        }

        function makeLinks(convertSelector) {
            var matchingElements = document.querySelectorAll(convertSelector);

            for (var i = 0; i < matchingElements.length; i++) {
                makeLinkFromElement(matchingElements[i]);
            }  
        }

        function makeLinkFromElement(element) {
            var a = document.createElement('a');
            a.href = '#' + createIdFromElement(element);
            a.className = elementsToLinksClassName;
            element.appendChild(a);
        }

        function createIdFromElement(element) {
            var id = element.id ? element.id : makeUrlFriendly(element.innerText);
            element.id = id;
            return id;
        }

        function makeUrlFriendly(string) {
            string = string.split(' ').join('+');
            string = htmlEscape(string);
            return string;
        }

        // http://stackoverflow.com/a/7124052
        function htmlEscape(str) {
            return String(str)
                    .replace(/&/g, '+')
                    .replace(/"/g, '')
                    .replace(/'/g, '')
                    .replace(/#/g, '')
                    .replace(/%/g, '')
                    .replace(/</g, '')
                    .replace(/>/g, '');
        }

        function styleLinks(convertSelector) {
            var stylesheet = document.createElement('style'),
                selectors = convertSelector.split(',');
            
            stylesheet.type='text/css'; 
            stylesheet.innerHTML = '.' + elementsToLinksClassName + ' { display: none; opacity: 0.7;} \n';
            stylesheet.innerHTML += '.' + elementsToLinksClassName + ':hover {opacity: 1.0;} \n';

            for (var i = 0; i < selectors.length; i++) {
                selectors[i] = selectors[i].replace(',', '');
                stylesheet.innerHTML += selectors[i] + ':hover > .' + elementsToLinksClassName;

                if (i < (selectors.length-1)) {
                    stylesheet.innerHTML += ', ';
                }
                else {
                    stylesheet.innerHTML += ' {';
                }
            }

            stylesheet.innerHTML += 'display: block;';
            stylesheet.innerHTML += 'width: 33px;';
            stylesheet.innerHTML += 'height: 18px;';
            stylesheet.innerHTML += 'background-position: -3px -5px;';
            stylesheet.innerHTML += 'float: left;';
            stylesheet.innerHTML += 'margin-right: 10px;';
            stylesheet.innerHTML += 'background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAcCAIAAACCvloyAAAMPmlDQ1BJQ0MgUHJvZmlsZQAASA2tV3dYU9cb/u5IAiEJIyECMsJeouwpewsKMoU6CCGQMGIIBBX3KK1gHag4cFS0KmLVagWkDkTcFMVtHUUtCkotDlyo/M4Nwz592v9+J885973v+c533++7556cA6BpI5TLc3EtgDxZoSIuPEgwKSVVwPgdMPRTB2PgCUUF8sDY2Gj4z/LmBrJF5aoD5es/zf69QztDXCACwGJRd3pGgSgP4Z8BSI5IrigEoDUj3nxGoZzCnQjzFEggwh8pnKXCdKQeeOkD2EJlkxAXDED3BFBjCYWKLABOCOIFRaIs5IeTgbCjLEMqQ3gNwn4iiRBxnGsIj8rLm46wJoJgk/43P1l/w0Jh+rBPoTBrGA/EQg0FtRBpgTxXOEt18/9s8nKVKF+qYopalkQREYeuPJS3TTnToyjMQviALH1CDMI6CB+VUhEP4FaJMiIRYcq+XVQQjHIJfIRfZwhDohA2BMCZypzEwEFsJVQgpLLHg6SFkQmDOEkxPW7QP54ty51AzQ/kB58jEUcO4XJxQWg84pEGPDtTGhaJMHpX+O5iSUIywkgnXl8kTZqAMAfh5oKceEoD5edKsSSY4lU2CmUcpdkC8Z2ZijAqRmRDsPIKEFL5J8xEQtWz9BDvWihJiEA8GktEZ4hDQhFGzyUmiWWJg3oIibwwiPJD2RfLc1XzG+kkysW54RRvhvCOgqL4obFnChUJFI/yRtzIFo6j5ivSTDyVF8ZSOaH0vINoCIYQEIAS1XSYDtkgbe2u60Z3Az1hIAQFZIEYHAaZoRHJqh4ZauOhGP4EGbIpGB4XpOoVQxHiPw2zA2MdIFPVW6QakQOP0RPySAPSj/Qho1EbgKoz6Ul6DY0TaA7ppIfSQ+gR9DC67RADIqQ6F1UFSP+Fi0J9YhSdArWyoRi++KM9prXRHtKu09pptyEJ/lB5GYx0mnSRYkjBsOfx0I68DWRFjDImg64hG9IKqXYjg0hfpB9pJ/mkATiQriiSQNIfxeaG2KHsUaqVw9q+5HIo70N2lGrB32Ic5Dl2HLdBFelDUaE3OZSJf3r50iOFDGQV9U9L4lviEHGWOEmcJ44SdSAgThD1RAtxjMKDmsNU2ckaflqcKqM5KAbpkI1jjWOX48ehu+FYhYihFFDvAM3/QvHMQjT/IHi6fJZCmiUpFASiVVgsiJSJRo8SODs6uQFQazplA/CKr1qrMf6FL1x+I4BXKVoDqOVUQFkBCM0BjjwG4L75wpm/RJ/USoBjl0VKRdGAHUldaMBECyYP9NH/hTnYoJicwR18IABCYRzEQAKkwFSUdQnkIdUzYA4shBIog5WwFjbCVtgOu+FHOAh1cBROwhm4CJfhOtxBc6MDnkEPvIE+DMMYGBvjYvqYCWaJ2WPOmCfmh4Vi0VgcloKlYVmYDFNic7DFWBlWjm3EtmHV2E/YEewkdh5rw25jD7Au7CX2ASdwFs7DjXArfAzuiQfiUXgCPgXPwvPxYnwJvhxfj1fhe/Fa/CR+Eb+Ot+PP8F4CCA2CT5gSDoQnEUzEEKlEJqEg5hGlRAVRRewjGtC7vkq0E93Ee5JOckkB6YDmZwSZSIrIfHIeuYzcSO4ma8lm8ir5gOwhP9PYNEOaPc2bFkmbRMuizaCV0CpoO2mHaafRt9NBe0On0/l0a7oH+jZT6Nn02fRl9M30/fRGehv9Eb2XwWDoM+wZvowYhpBRyChhbGDsZZxgXGF0MN6paaiZqDmrhamlqsnUFqlVqO1RO652Re2JWp+6lrqlurd6jHqG+iz1Feo71BvUL6l3qPcxtZnWTF9mAjObuZC5nrmPeZp5l/lKQ0PDTMNLY6KGVGOBxnqNAxrnNB5ovGfpsOxYwazJLCVrOWsXq5F1m/WKzWZbsQPYqexC9nJ2NfsU+z77HYfLGc2J5GRw5nMqObWcK5znmuqalpqBmlM1izUrNA9pXtLs1lLXstIK1hJqzdOq1DqidVOrV5ur7aQdo52nvUx7j/Z57U4dho6VTqhOhs4Sne06p3QecQmuOTeYK+Iu5u7gnuZ28Og8a14kL5tXxvuR18rr0dXRddVN0p2pW6l7TLedT/Ct+JH8XP4K/kH+Df6HEUYjAkeIRywdsW/ElRFv9UbqBeiJ9Ur19utd1/ugL9AP1c/RX6Vfp3/PgDSwM5hoMMNgi8Fpg+6RvJE+I0UjS0ceHPmbIW5oZxhnONtwu2GLYa+RsVG4kdxog9Epo25jvnGAcbbxGuPjxl0mXBM/E6nJGpMTJk8FuoJAQa5gvaBZ0GNqaBphqjTdZtpq2mdmbZZotshsv9k9c6a5p3mm+RrzJvMeCxOL8RZzLGosfrNUt/S0lFiuszxr+dbK2irZ6hurOqtOaz3rSOti6xrruzZsG3+bfJsqm2u2dFtP2xzbzbaX7XA7NzuJXaXdJXvc3t1ear/Zvm0UbZTXKNmoqlE3HVgOgQ5FDjUOD0bzR0ePXjS6bvTzMRZjUsesGnN2zGdHN8dcxx2Od5x0nMY5LXJqcHrpbOcscq50vubCdglzme9S7/LC1d5V7LrF9ZYb12282zduTW6f3D3cFe773Ls8LDzSPDZ53PTkecZ6LvM850XzCvKa73XU6723u3eh90Hvv3wcfHJ89vh0jrUeKx67Y+wjXzNfoe8233Y/gV+a3/d+7f6m/kL/Kv+HAeYBGQE7A54E2gZmB+4NfB7kGKQIOhz0Ntg7eG5wYwgREh5SGtIaqhOaGLox9H6YWVhWWE1YT7hb+OzwxghaRFTEqoibkUaRosjqyJ5xHuPmjmuOYkXFR22MehhtF62IbhiPjx83fvX4uxMsJ8gm1MVATGTM6ph7sdax+bG/TKRPjJ1YOfFxnFPcnLiz8dz4afF74t8kBCWsSLiTaJOoTGxK0kyanFSd9DY5JLk8uX3SmElzJ11MMUiRptSnMlKTUnem9n4V+tXarzomu00umXxjivWUmVPOTzWYmjv12DTNacJph9Joaclpe9I+CmOEVcLe9Mj0Tek9omDROtGzjICMNRldYl9xufhJpm9meWZnlm/W6qwuib+kQtItDZZulL7Ijsjemv02JyZnV05/bnLu/jy1vLS8IzIdWY6sebrx9JnT2+T28hJ5e753/tr8HkWUYmcBVjCloL6QhzbPLUob5dfKB0V+RZVF72YkzTg0U3umbGbLLLtZS2c9KQ4r/mE2OVs0u2mO6ZyFcx7MDZy7bR42L31e03zz+UvmdywIX7B7IXNhzsJfFzkuKl/0enHy4oYlRksWLHn0dfjXNSWcEkXJzW98vtn6Lfmt9NvWpS5LNyz9XJpReqHMsayi7OMy0bIL3zl9t/67/uWZy1tXuK/YspK+Urbyxir/VbvLtcuLyx+tHr+6do1gTema12unrT1f4VqxdR1znXJd+/ro9fUbLDas3PBxo2Tj9cqgyv2bDDct3fR2c8bmK1sCtuzbarS1bOuH76Xf39oWvq22yqqqYjt9e9H2xzuSdpz9wfOH6p0GO8t2ftol29W+O253c7VHdfUewz0ravAaZU3X3sl7L/8Y8mP9Pod92/bz95cdgAPKA09/SvvpxsGog02HPA/t+9ny502HuYdLa7HaWbU9dZK69vqU+rYj4440Nfg0HP5l9C+7jpoerTyme2zFcebxJcf7TxSf6G2UN3afzDr5qGla051Tk05da57Y3Ho66vS5M2FnTp0NPHvinO+5o+e9zx+54Hmh7qL7xdoWt5bDv7r9erjVvbX2ksel+stelxvaxrYdv+J/5eTVkKtnrkVeu3h9wvW2G4k3bt2cfLP9Vsatztu5t1/8VvRb350Fd2l3S+9p3au4b3i/6nfb3/e3u7cfexDyoOVh/MM7j0SPnv1R8MfHjiWP2Y8rnpg8qe507jzaFdZ1+elXTzueyZ/1dZf8qf3npuc2z3/+K+Cvlp5JPR0vFC/6Xy57pf9q12vX1029sb333+S96Xtb+k7/3e73nu/Pfkj+8KRvxkfGx/WfbD81fI76fLc/r79fLlQIVXsBArV4ZibAy10A7BS0d7gMwOQMnLlUFtSZcqBQ1//AA+cylZk7wK4AgMQFANGNAFtQtUSYha7U9jshAHAXl+GKGKoUZLo4qwDGUqCtybv+/ldGAIwGgE+K/v6+zf39n3agvfptgMb8gbMeZU2dIb/Xp1DLTQT/Uf4HPwdpudqrfEIAAAAJcEhZcwAAFiUAABYlAUlSJPAAAAGbaVRYdFhNTDpjb20uYWRvYmUueG1wAAAAAAA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJYTVAgQ29yZSA1LjQuMCI+CiAgIDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+CiAgICAgIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiCiAgICAgICAgICAgIHhtbG5zOmV4aWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vZXhpZi8xLjAvIj4KICAgICAgICAgPGV4aWY6UGl4ZWxYRGltZW5zaW9uPjM4PC9leGlmOlBpeGVsWERpbWVuc2lvbj4KICAgICAgICAgPGV4aWY6UGl4ZWxZRGltZW5zaW9uPjI4PC9leGlmOlBpeGVsWURpbWVuc2lvbj4KICAgICAgPC9yZGY6RGVzY3JpcHRpb24+CiAgIDwvcmRmOlJERj4KPC94OnhtcG1ldGE+CoZWa8MAAAIwSURBVEgN7ZW7rqFRFMePkSjE7QEQFFovoOYRXF5JQuLWeAtRiJZQayQoSFRKt4LG/CYrWWd/ezMzZzLOTHG+Qtbe//Vf/+9bN777/f72uc+3z5X7ofYl+aKc/0+JPZ1O3W63Wq0mk0mf8yQSiXK53G63j8cjybhcLsViUb2gQIROkAepYkjcZzqdZjKZB97OVSqVmkwmRLjdbqVSycIJMpvNrPhv1pljs9n0+/0W+SdHnBuNBsTr9ZrNZi1PUAKaKrYk3/chPRGAIt86Go0sSY6g5rd6JCmMmc9gMFiv1zebjfmOYu92O0oVjUZVIJ1OQxd0u922Wq1wOKwoYRX1SHY6HXVCbz6fu2LmzXq9jsViSoFuoovFIhQKuahHslKpqEetVjP52LlcTtFerycohl5CtygkyUU9krS+eiyXS4tvppHECrrf75UC3aKsVisXfboKGDL1FiMSiehNIBAQm9nQS5lRPWLwBuZRbI9kPp9Xj8FgoLYYJtrv9+VyOByqGzOqthjqxvGdbqbCbB8qT/2foXQNvWOirk330YP6EtpcnlpaQ0KX0+t0vIQDZRI0BKVlTrSopiRzReOYek+HBNqzVcCMgzLvf7Yonq4CedOHC49Nxj7Dgd32IVWcf7HwRPXhWmdr0584jMdjt1M04abxu2tdVKkcBWe6zWEtFArn8xmHw+HAPxf/X/F43NQQGwpE6ASRaOavj4PLeemNZy5fqqTBvyQ1FX/X+AeJ/Q6hXAkdir8ruQAAAABJRU5ErkJggg==)';
            stylesheet.innerHTML += '}\n';
            document.body.appendChild(stylesheet);
        }

        return {
            convert: convert
        }
    }());

    // CommonJS module
    if ( typeof module !== 'undefined' && module.exports ) {
        module.exports = ElementsToLinks;
    }

    // AMD module
    else if ( typeof define !== 'undefined' && define.amd ) {
        define(function () { return ElementsToLinks; });
    }

    // browser global
    else {
        global.ElementsToLinks = ElementsToLinks;
    }
}((typeof window !== 'undefined') ? window : this ));