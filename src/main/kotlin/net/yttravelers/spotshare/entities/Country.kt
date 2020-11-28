package net.yttravelers.spotshare.entities

import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.Id
import javax.persistence.Table

@Entity
@Table(name = "country")
class Country {

    //TODO: java.util.Locale.IsoCountryCode型にできるかも
    @Id
    @Column(nullable = false)
    lateinit var countryCode: String

    @Column(nullable = false)
    lateinit var countryName: String

    //TODO: java.util.Currency型にしたい
    @Column(nullable = false)
    var currency: String? = null

    //TODO: java.util.TimeZone型にしたい
    @Column(nullable = false)
    lateinit var timezone: String

}