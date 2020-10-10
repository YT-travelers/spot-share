package net.yttravelers.spotshare.entities

import java.time.LocalDateTime
import javax.persistence.*

@Entity
class RouteDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Int? = null

    var orderNumber: Int? = null

    var scheduledDateTime: LocalDateTime? = null

    var favoritePoint: Int? = null

    var memo: String? = null

    @ManyToOne(fetch = FetchType.EAGER)
    var spot: Spot? = null
}