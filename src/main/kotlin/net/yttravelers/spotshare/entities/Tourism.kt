package net.yttravelers.spotshare.entities

import java.time.LocalDateTime
import javax.persistence.*

@Entity
@Table(name = "tourism")
class Tourism {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var tourismId: Int? = null

    @Column(nullable = false)
    var tourismName: String = ""

    //TODO: 国マスタ
    @ManyToOne
    @JoinColumn(name = "countryCode")
    var tourismCountry: Country? = null

    //TODO: 町マスタ
//    var tourismCity: City

    var tourismOpenTime: LocalDateTime? = null

    var tourismCloseTime: LocalDateTime? = null

    var tourismSummary: String = ""

    var tourismAddress: String = ""

    var tourismUrl: String = ""

}