/*
 * Copyright (c) 2023, Salesforce, Inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import {getDisplayVariationValues, getDisplayPrice} from './product-utils'
import mockProductDetail, {variantWithPromos} from '../commerce-api/mocks/variant-750518699578M'

const variationAttributes = [
    {
        id: 'color',
        name: 'Colour',
        values: [
            {name: 'Black', orderable: true, value: 'BLACKLE'},
            {name: 'Taupe', orderable: true, value: 'TAUPETX'}
        ]
    },
    {
        id: 'size',
        name: 'Size',
        values: [
            {name: '6', orderable: true, value: '060'},
            {name: '6.5', orderable: true, value: '065'},
            {name: '7', orderable: true, value: '070'},
            {name: '7.5', orderable: true, value: '075'},
            {name: '8', orderable: true, value: '080'},
            {name: '8.5', orderable: true, value: '085'},
            {name: '9', orderable: true, value: '090'},
            {name: '9.5', orderable: true, value: '095'},
            {name: '10', orderable: true, value: '100'},
            {name: '11', orderable: true, value: '110'}
        ]
    },
    {id: 'width', name: 'Width', values: [{name: 'M', orderable: true, value: 'M'}]}
]
const mockedBasePrice = 299.99
const mockedDiscountPrice = 149.99

test('getDisplayVariationValues', () => {
    const selectedValues = {
        color: 'TAUPETX',
        size: '065',
        width: 'M'
    }
    const result = getDisplayVariationValues(variationAttributes, selectedValues)

    expect(result).toEqual({
        Colour: 'Taupe',
        Size: '6.5',
        Width: 'M'
    })
})

describe('getDisplayPrice', function () {
    test('returns basePrice and discountPrice', () => {
        const {basePrice, discountPrice} = getDisplayPrice(variantWithPromos)
        expect(basePrice).toBe(mockedBasePrice)
        expect(discountPrice).toBe(mockedDiscountPrice)
    })

    test('returns null if there is not discount promotion', () => {
        const {basePrice, discountPrice} = getDisplayPrice(mockProductDetail)
        expect(basePrice).toBe(mockedBasePrice)
        expect(discountPrice).toBeNull()
    })
})
