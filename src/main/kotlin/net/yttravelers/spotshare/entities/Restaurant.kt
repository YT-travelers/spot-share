package net.yttravelers.spotshare.entities

import net.yttravelers.spotshare.entities.codes.CuisineGenreDiv
import java.time.LocalDateTime
import javax.persistence.*

@Entity
@Table(name = "restaurant")
class Restaurant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var restaurantId: Int? = null

    @Column(nullable = false)
    var restaurantName: String = ""

    @ManyToOne
    @JoinColumn(name = "countryCode")
    var tourismCountry: Country? = null

    @ManyToOne
    @JoinColumns(
            JoinColumn(name="cuisineGenreDiv", referencedColumnName="division"),
            JoinColumn(name="cuisineGenreDivKey", referencedColumnName="divKey")
    )
    var cuisineGenreDiv: CuisineGenreDiv? = null

    //TODO: 区分の設計
//    var restaurantKindDiv:

    var restaurantOpenTime: LocalDateTime? = null

    var restaurantCloseTime: LocalDateTime? = null

    var restaurantSummary: String = ""

    var restaurantAddress: String = ""

    var restaurantUrl: String = ""

}