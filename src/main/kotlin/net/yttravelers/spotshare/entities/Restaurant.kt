package net.yttravelers.spotshare.entities

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

    //TODO: 国マスタ
    @ManyToOne
    var tourismCountry: Country? = null

    //TODO: 区分の設計
//    var cuisineGenreDiv:

    //TODO: 区分の設計
//    var restaurantKindDiv:

    var restaurantOpenTime: LocalDateTime? = null

    var restaurantCloseTime: LocalDateTime? = null

    var restaurantSummary: String = ""

    var restaurantAddress: String = ""

    var restaurantUrl: String = ""

}