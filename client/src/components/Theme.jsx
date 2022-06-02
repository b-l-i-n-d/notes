/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import React from 'react';

function Theme() {
    return (
        <div className="dropdown-top dropdown mt-4 w-full">
            <label tabIndex="0" className="btn btn-ghost w-full space-x-2 shadow-md">
                <i className="fa-solid fa-swatchbook" />
                <span>Change Theme</span>
                <i className="fa-solid fa-angle-up" />
            </label>
            <ul
                className="no-scrollbar dropdown-content menu menu-compact h-96 w-full overflow-y-scroll rounded bg-base-100 p-4"
                tabIndex="0"
            >
                <li>
                    <button
                        type="button"
                        data-set-theme=""
                        data-act-class="active"
                        className="active"
                    >
                        Default
                    </button>
                </li>
                <li>
                    <button type="button" data-set-theme="light" data-act-class="active">
                        🌝 light
                    </button>
                </li>
                <li>
                    <button type="button" data-set-theme="dark" data-act-class="active">
                        🌚 dark
                    </button>
                </li>
                <li>
                    <button type="button" data-set-theme="cupcake" data-act-class="active">
                        🧁 cupcake
                    </button>
                </li>
                <li>
                    <button type="button" data-set-theme="bumblebee" data-act-class="active">
                        🐝 bumblebee
                    </button>
                </li>
                <li>
                    <button type="button" data-set-theme="emerald" data-act-class="active">
                        ✳️ Emerald
                    </button>
                </li>
                <li>
                    <button type="button" data-set-theme="corporate" data-act-class="active">
                        🏢 Corporate
                    </button>
                </li>
                <li>
                    <button type="button" data-set-theme="synthwave" data-act-class="active">
                        🌃 synthwave
                    </button>
                </li>
                <li>
                    <button type="button" data-set-theme="retro" data-act-class="active">
                        👴 retro
                    </button>
                </li>
                <li>
                    <button type="button" data-set-theme="cyberpunk" data-act-class="active">
                        🤖 cyberpunk
                    </button>
                </li>
                <li>
                    <button type="button" data-set-theme="valentine" data-act-class="active">
                        🌸 valentine
                    </button>
                </li>
                <li>
                    <button type="button" data-set-theme="halloween" data-act-class="active">
                        🎃 halloween
                    </button>
                </li>
                <li>
                    <button type="button" data-set-theme="garden" data-act-class="active">
                        🌷 garden
                    </button>
                </li>
                <li>
                    <button type="button" data-set-theme="forest" data-act-class="active">
                        🌲 forest
                    </button>
                </li>
                <li>
                    <button type="button" data-set-theme="aqua" data-act-class="active">
                        🐟 aqua
                    </button>
                </li>
                <li>
                    <button type="button" data-set-theme="lofi" data-act-class="active">
                        👓 lofi
                    </button>
                </li>
                <li>
                    <button type="button" data-set-theme="pastel" data-act-class="active">
                        🖍 pastel
                    </button>
                </li>
                <li>
                    <button type="button" data-set-theme="fantasy" data-act-class="active">
                        🧚‍♀️ fantasy
                    </button>
                </li>
                <li>
                    <button type="button" data-set-theme="wireframe" data-act-class="active">
                        📝 Wireframe
                    </button>
                </li>
                <li>
                    <button type="button" data-set-theme="black" data-act-class="active">
                        🏴 black
                    </button>
                </li>
                <li>
                    <button type="button" data-set-theme="luxury" data-act-class="active">
                        💎 luxury
                    </button>
                </li>
                <li>
                    <button type="button" data-set-theme="dracula" data-act-class="active">
                        🧛‍♂️ dracula
                    </button>
                </li>
                <li>
                    <button type="button" data-set-theme="cmyk" data-act-class="active">
                        🖨 CMYK
                    </button>
                </li>
                <li>
                    <button type="button" data-set-theme="autumn" data-act-class="active">
                        🍁 Autumn
                    </button>
                </li>
                <li>
                    <button type="button" data-set-theme="business" data-act-class="active">
                        💼 Business
                    </button>
                </li>
                <li>
                    <button type="button" data-set-theme="acid" data-act-class="active">
                        💊 Acid
                    </button>
                </li>
                <li>
                    <button type="button" data-set-theme="lemonade" data-act-class="active">
                        🍋 Lemonade
                    </button>
                </li>
                <li>
                    <button type="button" data-set-theme="night" data-act-class="active">
                        🌙 Night
                    </button>
                </li>
                <li>
                    <button type="button" data-set-theme="coffee" data-act-class="active">
                        ☕️ Coffee
                    </button>
                </li>
                <li>
                    <button type="button" data-set-theme="winter" data-act-class="active">
                        ❄️ Winter
                    </button>
                </li>
            </ul>
        </div>
    );
}

export default Theme;
